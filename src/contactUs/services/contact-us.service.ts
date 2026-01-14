import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { ContactUsRepository } from 'src/common/database/contactUs/repositories/contact-us.repository';
import { CreateContactUsModel } from '../models/create-contact-us-model';
import { UpdateContactUsModel } from '../models/update-contact-us-model';
import { ContactUsReadModel } from '../models/read-contact-us-model';

@Injectable()
export class ContactUsService {
    constructor(
        private readonly contactUsRepository: ContactUsRepository,
    ) {}

    /** ✅ Create Contact Us */
    async createContactUs(model: CreateContactUsModel): Promise<{ id: string }> {
        try {
            const contactUs = await this.contactUsRepository.create(model);
            return { id: contactUs.id };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create contact information', {
                cause: new Error(`Error creating contact information: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Contact Us */
    async getContactUs(): Promise<ContactUsReadModel | null> {
        try {
            return await this.contactUsRepository.get();
        } catch (error) {
            throw new InternalServerErrorException('Failed to get contact information', {
                cause: new Error(`Error getting contact information: ${error?.message}`),
            });
        }
    }

    /** ✅ Update Contact Us */
    async updateContactUs(model: UpdateContactUsModel): Promise<{ id: string }> {
        try {
            return await this.contactUsRepository.update(model);
        } catch (error) {
            throw new InternalServerErrorException('Failed to update contact information', {
                cause: new Error(`Error updating contact information: ${error?.message}`),
            });
        }
    }

    /** ✅ Upsert Contact Us (Update or Create) */
    async upsertContactUs(model: CreateContactUsModel): Promise<{ id: string }> {
        try {
            return await this.contactUsRepository.upsert(model);
        } catch (error) {
            throw new InternalServerErrorException('Failed to save contact information', {
                cause: new Error(`Error saving contact information: ${error?.message}`),
            });
        }
    }
}
