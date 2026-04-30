import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import type { Queue } from "bullmq";
import { BOOKING_EXTRA_PRICING, BOOKING_QUEUE, BOOKING_SERVICE_PRICING, SEND_EMAIL_JOB } from "./constants";
import type { CreateBookingDto } from "./dto/create-booking.dto";

export type BookingAcceptedResponse = {
  success: true;
  queued: true;
  estimate: number;
};

@Injectable()
export class BookingService {
  constructor(
    @InjectQueue(BOOKING_QUEUE) private readonly bookingQueue: Queue,
  ) {}

  async createBooking(booking: CreateBookingDto): Promise<BookingAcceptedResponse> {
    const estimate = this.calculateEstimate(booking);

    await this.bookingQueue.add(SEND_EMAIL_JOB, {
      booking,
      estimate,
    });

    return {
      success: true,
      queued: true,
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

  async getQueueHealth() {
    const client = await this.bookingQueue.client;
    const [redis, counts] = await Promise.all([
      client.ping(),
      this.bookingQueue.getJobCounts("waiting", "active", "completed", "failed", "delayed"),
    ]);

    return {
      api: "ok",
      redis,
      queue: BOOKING_QUEUE,
      counts,
    };
  }
}
