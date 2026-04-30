import { z } from "zod";
import { bookingServices, type BookingServiceType } from "~/stores/booking";

const serviceValues = bookingServices.map((service) => service.value) as [BookingServiceType, ...BookingServiceType[]];

export const basicsSchema = z.object({
  serviceType: z.enum(serviceValues),
  addressLine1: z.string().trim().min(3, "Enter the address."),
  unitNumber: z.string().trim().optional(),
  suburb: z.string().trim().min(2, "Enter the suburb."),
  state: z.string().trim().min(2, "Select a state."),
  postcode: z.string().trim().regex(/^\d{4}$/, "Enter a valid 4-digit postcode."),
});

export const scopeSchema = z.object({
  bedrooms: z.number().min(0).max(8),
  bathrooms: z.number().min(1).max(6),
});

export const extrasSchema = z.object({
  extras: z.array(z.string()),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  phone: z.string().trim().min(8, "Enter a valid phone number."),
  email: z.string().trim().email("Enter a valid email address."),
  date: z.string().trim().min(1, "Choose a preferred date."),
});

export type BookingStepErrors = Record<string, string>;
