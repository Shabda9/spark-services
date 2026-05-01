import { z } from "zod";
import { BOOKING_SERVICE_TYPES } from "../../booking/constants";

export const CONTACT_SERVICE_TYPES = [
  "general_cleaning",
  ...BOOKING_SERVICE_TYPES,
] as const;

export const createContactEnquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("A valid email is required."),
  phone: z.string().trim().optional().default(""),
  message: z.string().trim().min(10, "Message is required."),
  serviceType: z.enum(CONTACT_SERVICE_TYPES).default("general_cleaning"),
});

export type CreateContactEnquiryDto = z.infer<typeof createContactEnquirySchema>;
