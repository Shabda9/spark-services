import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Handlebars from "handlebars";
import nodemailer, { type Transporter } from "nodemailer";
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
  private readonly transporter: Transporter;
  private readonly quoteTemplate = Handlebars.compile(quoteEmailTemplate);

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>("SMTP_HOST"),
      port: this.config.get<number>("SMTP_PORT", 587),
      secure: this.config.get<string>("SMTP_SECURE", "false") === "true",
      auth: {
        user: this.config.get<string>("SMTP_USER"),
        pass: this.config.get<string>("SMTP_PASS"),
      },
    });
  }

  async sendBookingQuote({ booking, estimate, pdfBase64 }: SendBookingQuoteInput): Promise<void> {
    const pdfBytes = Buffer.byteLength(pdfBase64, "base64");
    const debugSavePdf = this.config.get<string>("DEBUG_SAVE_PDF", "false") === "true";
    const service = BOOKING_SERVICE_PRICING[booking.serviceType];

    this.logger.log(
      `Sending quote email to ${booking.contact.email} using ${this.config.get<string>("SMTP_HOST")} with PDF ${pdfBytes} bytes`,
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
    });

    await this.transporter.sendMail({
      from: this.config.get<string>("MAIL_FROM", "Spark Services <quotes@sparkservices.com.au>"),
      to: booking.contact.email,
      subject: "Your Spark Services Quote",
      html,
      attachments: [
        {
          filename: "spark-services-quote.pdf",
          content: pdfBase64,
          encoding: "base64",
          contentType: "application/pdf",
          contentDisposition: "attachment",
        },
      ],
    });

    this.logger.log(`Quote email accepted by SMTP for ${booking.contact.email}`);
  }
}
