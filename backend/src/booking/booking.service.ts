import { Injectable } from "@nestjs/common";
import { BOOKING_EXTRA_PRICING, BOOKING_SERVICE_PRICING } from "./constants";
import type { CreateBookingDto } from "./dto/create-booking.dto";
import { BookingPdfService } from "./pdf/booking-pdf.service";
import { MailService } from "../mail/mail.service";

export type BookingQuoteResponse = {
  success: true;
  emailSent: true;
  estimate: number;
};

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingPdfService: BookingPdfService,
    private readonly mailService: MailService,
  ) {}

  async createBooking(booking: CreateBookingDto): Promise<BookingQuoteResponse> {
    const estimate = this.calculateEstimate(booking);
    const pdfBuffer = await this.bookingPdfService.generateQuotePdf(booking, estimate);

    await this.mailService.sendBookingQuote({
      booking,
      estimate,
      pdfBase64: pdfBuffer.toString("base64"),
    });

    return {
      success: true,
      emailSent: true,
      estimate,
    };
  }

  calculateEstimate(booking: Pick<CreateBookingDto, "serviceType" | "bedrooms" | "bathrooms" | "extras">): number {
    const service = BOOKING_SERVICE_PRICING[booking.serviceType];
    const bedroomTotal = booking.bedrooms * service.bedroomRate;
    const bathroomTotal = booking.bathrooms * service.bathroomRate;
    const extrasTotal = booking.extras.reduce((total, extra) => total + (BOOKING_EXTRA_PRICING[extra] ?? 0), 0);

    return service.base + bedroomTotal + bathroomTotal + extrasTotal;
  }

  getHealth() {
    return {
      api: "ok",
      booking: "ok",
    };
  }
}
