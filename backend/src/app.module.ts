import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BookingModule } from "./booking/booking.module";
import { ContactModule } from "./contact/contact.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    BookingModule,
    ContactModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
