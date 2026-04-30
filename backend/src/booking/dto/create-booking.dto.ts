import { z } from "zod";
import { BOOKING_EXTRA_TYPES, BOOKING_SERVICE_TYPES } from "../constants";

export const bookingServiceTypeSchema = z.enum(BOOKING_SERVICE_TYPES);
export const bookingExtraSchema = z.enum(BOOKING_EXTRA_TYPES);

export const createBookingSchema = z.object({
  serviceType: bookingServiceTypeSchema,
  addressLine1: z.string().trim().min(3, "Address is required."),
  unitNumber: z.string().trim().optional().default(""),
  suburb: z.string().trim().min(2, "Suburb is required."),
  state: z.string().trim().min(2, "State is required."),
  postcode: z.string().trim().regex(/^\d{4}$/, "Postcode must be 4 digits."),
  bedrooms: z.number().int().min(0).max(10),
  bathrooms: z.number().int().min(1).max(8),
  extras: z.array(bookingExtraSchema).default([]),
  contact: z.object({
    name: z.string().trim().min(2, "Name is required."),
    email: z.string().trim().email("A valid email is required."),
    phone: z.string().trim().min(8, "Phone number is required."),
    date: z.string().trim().min(1, "Preferred date is required."),
  }),
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
