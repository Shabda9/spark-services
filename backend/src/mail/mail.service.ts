import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Handlebars from "handlebars";
import { Resend } from "resend";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { BOOKING_SERVICE_PRICING } from "../booking/constants";
import type { CreateBookingDto } from "../booking/dto/create-booking.dto";
import { quoteEmailTemplate } from "./templates/quote-email.template";

type SendBookingQuoteInput = {
  booking: CreateBookingDto;
  estimate: number;
  pdfBase64: string;
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
}
