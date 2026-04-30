import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { BookingService } from "./booking/booking.service";

@Controller("health")
export class HealthController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  health() {
    return this.bookingService.getQueueHealth();
  }
}
