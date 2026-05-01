import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Handlebars from "handlebars";
import { Resend } from "resend";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { BOOKING_SERVICE_PRICING } from "../booking/constants";
import type { CreateBookingDto } from "../booking/dto/create-booking.dto";
import type { CreateContactEnquiryDto } from "../contact/dto/create-contact-enquiry.dto";
import { quoteEmailTemplate } from "./templates/quote-email.template";

type SendBookingQuoteInput = {
  booking: CreateBookingDto;
  estimate: number;
  pdfBase64: string;
};

const contactServiceLabels: Record<CreateContactEnquiryDto["serviceType"], string> = {
  general_cleaning: "General cleaning enquiry",
  residential: "Residential Cleaning",
  office: "Office & Commercial",
  end_of_lease: "End of Lease Cleaning",
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend;
  private readonly quoteTemplate = Handlebars.compile(quoteEmailTemplate);

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>("RESEND_API_KEY");

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured.");
    }

    this.resend = new Resend(apiKey);
  }

  async sendBookingQuote({ booking, estimate, pdfBase64 }: SendBookingQuoteInput): Promise<void> {
    const pdfBytes = Buffer.byteLength(pdfBase64, "base64");
    const debugSavePdf = this.config.get<string>("DEBUG_SAVE_PDF", "false") === "true";
    const service = BOOKING_SERVICE_PRICING[booking.serviceType];
    const from = this.config.get<string>("MAIL_FROM", "Spark Services <onboarding@resend.dev>");
    const testRecipient = this.config.get<string>("QUOTE_TEST_RECIPIENT")?.trim();
    const recipient = testRecipient || booking.contact.email;
    const subjectPrefix = testRecipient ? "[DEV] " : "";

    this.logger.log(
      `Sending quote email to ${recipient} using Resend with PDF ${pdfBytes} bytes`,
    );

    if (debugSavePdf) {
      const outputDir = join(process.cwd(), "tmp", "quotes");
      await mkdir(outputDir, { recursive: true });
      const outputPath = join(outputDir, `spark-services-quote-${Date.now()}.pdf`);
      await writeFile(outputPath, Buffer.from(pdfBase64, "base64"));
      this.logger.log(`Saved debug PDF to ${outputPath}`);
    }

    const html = this.quoteTemplate({
      name: booking.contact.name,
      serviceType: service.label,
      bedrooms: booking.bedrooms,
      bathrooms: booking.bathrooms,
      extras: booking.extras.length ? booking.extras.join(", ") : "None",
      estimate,
      customerEmail: booking.contact.email,
      testRecipient,
    });

    const { data, error } = await this.resend.emails.send({
      from,
      to: recipient,
      subject: `${subjectPrefix}Your Spark Services Quote`,
      html,
      attachments: [
        {
          filename: "spark-services-quote.pdf",
          content: pdfBase64,
        },
      ],
    });

    if (error) {
      this.logger.error(`Resend rejected quote email for ${recipient}: ${error.message}`);
      throw new Error(error.message);
    }

    this.logger.log(`Quote email accepted by Resend for ${recipient} (${data?.id ?? "no-id"})`);
  }

  async sendContactEnquiry(enquiry: CreateContactEnquiryDto): Promise<void> {
    const from = this.config.get<string>("MAIL_FROM", "Spark Services <onboarding@resend.dev>");
    const recipient =
      this.config.get<string>("CONTACT_TO_EMAIL")?.trim()
      || this.config.get<string>("QUOTE_TEST_RECIPIENT")?.trim()
      || "hello@sparkservices.com.au";
    const serviceLabel = contactServiceLabels[enquiry.serviceType];
    const subject = `Spark Services enquiry: ${serviceLabel}`;
    const html = `
      <!doctype html>
      <html>
        <body style="font-family: Arial, sans-serif; color: #1C3D2E; line-height: 1.5;">
          <h1 style="margin: 0 0 16px;">New Spark Services enquiry</h1>
          <ul>
            <li><strong>Name:</strong> ${this.escapeHtml(enquiry.name)}</li>
            <li><strong>Email:</strong> ${this.escapeHtml(enquiry.email)}</li>
            <li><strong>Phone:</strong> ${this.escapeHtml(enquiry.phone || "-")}</li>
            <li><strong>Service:</strong> ${this.escapeHtml(serviceLabel)}</li>
          </ul>
          <p><strong>Message:</strong></p>
          <p>${this.escapeHtml(enquiry.message).replace(/\n/g, "<br />")}</p>
        </body>
      </html>
    `;

    this.logger.log(`Sending contact enquiry email to ${recipient} using Resend`);

    const { data, error } = await this.resend.emails.send({
      from,
      to: recipient,
      replyTo: enquiry.email,
      subject,
      html,
    });

    if (error) {
      this.logger.error(`Resend rejected contact enquiry for ${recipient}: ${error.message}`);
      throw new Error(error.message);
    }

    this.logger.log(`Contact enquiry accepted by Resend for ${recipient} (${data?.id ?? "no-id"})`);
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
