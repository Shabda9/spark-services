import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BOOKING_QUEUE } from "./constants";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { BookingPdfService } from "./pdf/booking-pdf.service";
import { BookingProcessor } from "./queue/booking.processor";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    BullModule.registerQueue({
      name: BOOKING_QUEUE,
    }),
    MailModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingPdfService, BookingProcessor],
  exports: [BookingService],
})
export class BookingModule {}
