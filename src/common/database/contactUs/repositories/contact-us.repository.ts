import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { DATABASE_CONNECTION } from '../../database.consts';
import { ContactUsEntity } from '../entities/contact-us.entity';
import { CreateContactUsModel } from 'src/contactUs/models/create-contact-us-model';
import { UpdateContactUsModel } from 'src/contactUs/models/update-contact-us-model';
import { ContactUsReadModel } from 'src/contactUs/models/read-contact-us-model';

@Injectable()
export class ContactUsRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Create Contact Us */
    async create(
        model: CreateContactUsModel,
        options?: IQueryOptions,
    ): Promise<ContactUsEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ContactUsEntity>(ContactUsEntity);

        // Check if contact info already exists (only one record allowed)
        const existing = await repository.find({ take: 1 });
        if (existing && existing.length > 0) {
            throw new BadRequestException('Contact information already exists. Use update endpoint instead.');
        }

        try {
            const entity = new ContactUsEntity();
            entity.addressLine1 = model.addressLine1;
            entity.addressLine2 = model.addressLine2;
            entity.city = model.city;
            entity.state = model.state;
            entity.zipCode = model.zipCode;
            entity.country = model.country;
            entity.phoneNumber = model.phoneNumber;
            entity.emailAddress = model.emailAddress;
            entity.facebookUrl = model.facebookUrl;
            entity.instagramUrl = model.instagramUrl;
            entity.twitterUrl = model.twitterUrl;
            entity.linkedinUrl = model.linkedinUrl;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating contact information failed', {
                cause: new Error(`Error creating contact information: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Contact Us */
    async get(options?: IQueryOptions): Promise<ContactUsReadModel | null> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ContactUsEntity>(ContactUsEntity);

        const contactUsList = await repository.find({ take: 1 });
        const contactUs = contactUsList && contactUsList.length > 0 ? contactUsList[0] : null;
        return contactUs ? ContactUsReadModel.fromEntity(contactUs) : null;
    }

    /** ✅ Update Contact Us */
    async update(
        model: UpdateContactUsModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ContactUsEntity>(ContactUsEntity);

        try {
            // If ID is provided, find by ID, otherwise get the only record
            let contactUs: ContactUsEntity | null;
            
            if (model.id && model.id !== '') {
                contactUs = await repository.findOne({ where: { id: model.id } });
            } else {
                const contactUsList = await repository.find({ take: 1 });
                contactUs = contactUsList && contactUsList.length > 0 ? contactUsList[0] : null;
            }
            
            if (!contactUs) {
                throw new NotFoundException('Contact information not found. Use create or upsert endpoint.');
            }

            // Update fields if provided
            contactUs.addressLine1 = model.addressLine1 ?? contactUs.addressLine1;
            contactUs.addressLine2 = model.addressLine2 ?? contactUs.addressLine2;
            contactUs.city = model.city ?? contactUs.city;
            contactUs.state = model.state ?? contactUs.state;
            contactUs.zipCode = model.zipCode ?? contactUs.zipCode;
            contactUs.country = model.country ?? contactUs.country;
            contactUs.phoneNumber = model.phoneNumber ?? contactUs.phoneNumber;
            contactUs.emailAddress = model.emailAddress ?? contactUs.emailAddress;
            contactUs.facebookUrl = model.facebookUrl ?? contactUs.facebookUrl;
            contactUs.instagramUrl = model.instagramUrl ?? contactUs.instagramUrl;
            contactUs.twitterUrl = model.twitterUrl ?? contactUs.twitterUrl;
            contactUs.linkedinUrl = model.linkedinUrl ?? contactUs.linkedinUrl;

            const updated = await repository.save(contactUs);
            return { id: updated.id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Updating contact information failed', {
                cause: new Error(`Error updating contact information: ${error?.message}`),
            });
        }
    }

    /** ✅ Update or Create Contact Us (Upsert) */
    async upsert(
        model: CreateContactUsModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ContactUsEntity>(ContactUsEntity);

        try {
            const contactUsList = await repository.find({ take: 1 });
            let contactUs = contactUsList && contactUsList.length > 0 ? contactUsList[0] : null;
            
            if (!contactUs) {
                contactUs = new ContactUsEntity();
            }

            // Update all fields
            contactUs.addressLine1 = model.addressLine1 ?? contactUs.addressLine1;
            contactUs.addressLine2 = model.addressLine2 ?? contactUs.addressLine2;
            contactUs.city = model.city ?? contactUs.city;
            contactUs.state = model.state ?? contactUs.state;
            contactUs.zipCode = model.zipCode ?? contactUs.zipCode;
            contactUs.country = model.country ?? contactUs.country;
            contactUs.phoneNumber = model.phoneNumber ?? contactUs.phoneNumber;
            contactUs.emailAddress = model.emailAddress ?? contactUs.emailAddress;
            contactUs.facebookUrl = model.facebookUrl ?? contactUs.facebookUrl;
            contactUs.instagramUrl = model.instagramUrl ?? contactUs.instagramUrl;
            contactUs.twitterUrl = model.twitterUrl ?? contactUs.twitterUrl;
            contactUs.linkedinUrl = model.linkedinUrl ?? contactUs.linkedinUrl;

            const saved = await repository.save(contactUs);
            return { id: saved.id };
        } catch (error) {
            throw new InternalServerErrorException('Saving contact information failed', {
                cause: new Error(`Error saving contact information: ${error?.message}`),
            });
        }
    }
}
