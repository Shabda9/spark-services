import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { MailService } from "../mail/mail.service";
import {
  createContactEnquirySchema,
  type CreateContactEnquiryDto,
} from "./dto/create-contact-enquiry.dto";

type ContactEnquiryResponse = {
  success: true;
  emailSent: true;
};

@Controller("contact")
export class ContactController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createContactEnquiry(
    @Body(new ZodValidationPipe(createContactEnquirySchema)) body: CreateContactEnquiryDto,
  ): Promise<ContactEnquiryResponse> {
    await this.mailService.sendContactEnquiry(body);

    return {
      success: true,
      emailSent: true,
    };
  }
}
