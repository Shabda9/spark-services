import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import type { Job } from "bullmq";
import { BOOKING_QUEUE, SEND_EMAIL_JOB } from "../constants";
import type { CreateBookingDto } from "../dto/create-booking.dto";
import { BookingPdfService } from "../pdf/booking-pdf.service";
import { MailService } from "../../mail/mail.service";

export type SendBookingEmailJob = {
  booking: CreateBookingDto;
  estimate: number;
};

@Processor(BOOKING_QUEUE)
export class BookingProcessor extends WorkerHost {
  private readonly logger = new Logger(BookingProcessor.name);

  constructor(
    private readonly bookingPdfService: BookingPdfService,
    private readonly mailService: MailService,
  ) {
    super();
  }

  async process(job: Job<SendBookingEmailJob>): Promise<void> {
    if (job.name !== SEND_EMAIL_JOB) {
      return;
    }

    const pdfBuffer = await this.bookingPdfService.generateQuotePdf(job.data.booking, job.data.estimate);
    const pdfBase64 = pdfBuffer.toString("base64");
    const pdfBytes = pdfBuffer.byteLength;

    this.logger.log(
      `Processing ${SEND_EMAIL_JOB} job ${job.id} for ${job.data.booking.contact.email} with PDF ${pdfBytes} bytes`,
    );

    await this.mailService.sendBookingQuote({
      booking: job.data.booking,
      estimate: job.data.estimate,
      pdfBase64,
    });

    this.logger.log(`Completed ${SEND_EMAIL_JOB} job ${job.id}`);
  }
}
