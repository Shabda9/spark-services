import { Injectable } from "@nestjs/common";
import PDFDocument from "pdfkit";
import { BOOKING_SERVICE_PRICING } from "../constants";
import type { CreateBookingDto } from "../dto/create-booking.dto";

@Injectable()
export class BookingPdfService {
  async generateQuotePdf(booking: CreateBookingDto, estimate: number): Promise<Buffer> {
    const service = BOOKING_SERVICE_PRICING[booking.serviceType];
    const doc = new PDFDocument({
      size: "A4",
      margin: 56,
      bufferPages: true,
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));

    const done = new Promise<Buffer>((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
    });

    doc.fontSize(22).text("Spark Services Quote", { align: "left" });
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor("#5f6f68").text("Professional cleaning quote", { align: "left" });
    doc.moveDown(2);

    doc.fillColor("#0D1117").fontSize(13).text(`Customer: ${booking.contact.name}`);
    doc.text(`Service type: ${service.label}`);
    doc.text(`Address: ${booking.addressLine1}`);
    doc.text(`Unit: ${booking.unitNumber || "-"}`);
    doc.text(`Suburb / state: ${booking.suburb}, ${booking.state}`);
    doc.text(`Property: ${booking.bedrooms} bedrooms / ${booking.bathrooms} bathrooms`);
    doc.text(`Postcode: ${booking.postcode}`);
    doc.text(`Preferred date: ${booking.contact.date}`);
    doc.text(`Extras: ${booking.extras.length ? booking.extras.join(", ") : "None"}`);
    doc.moveDown(1.5);

    doc.fontSize(18).fillColor("#1C3D2E").text(`Total estimate: $${estimate}`, {
      align: "left",
    });
    doc.moveDown(1);
    doc.fontSize(10).fillColor("#5f6f68").text("Final pricing is confirmed after access, condition, and parking are reviewed.");

    doc.end();

    return done;
  }
}
