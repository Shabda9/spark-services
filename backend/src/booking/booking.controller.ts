import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { BookingService, type BookingQuoteResponse } from "./booking.service";
import { createBookingSchema, type CreateBookingDto } from "./dto/create-booking.dto";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";

@Controller("booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  createBooking(
    @Body(new ZodValidationPipe(createBookingSchema)) body: CreateBookingDto,
  ): Promise<BookingQuoteResponse> {
    return this.bookingService.createBooking(body);
  }

  @Get("health")
  @HttpCode(HttpStatus.OK)
  health() {
    return this.bookingService.getHealth();
  }
}
