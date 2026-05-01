import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { BookingPdfService } from "./pdf/booking-pdf.service";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [MailModule],
  controllers: [BookingController],
  providers: [BookingService, BookingPdfService],
  exports: [BookingService],
})
export class BookingModule {}
