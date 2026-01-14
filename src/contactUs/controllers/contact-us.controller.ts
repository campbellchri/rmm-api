import { Body, Controller, Get, NotFoundException, Patch, Post } from '@nestjs/common';
import { ContactUsService } from '../services/contact-us.service';
import {
    CreateResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateContactUsRequestDto } from '../dtos/request/create-contact-us-request.dto';
import { UpdateContactUsRequestDto } from '../dtos/request/update-contact-us-request.dto';
import { CreateContactUsResponseDto } from '../dtos/response/create-contact-us-response.dto';
import { UpdateContactUsResponseDto } from '../dtos/response/update-contact-us-response.dto';
import { ReadContactUsResponseDto } from '../dtos/response/read-contact-us-response.dto';
import { CreateContactUsModel } from '../models/create-contact-us-model';
import { UpdateContactUsModel } from '../models/update-contact-us-model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('contact-us')
export class ContactUsController {
    constructor(private readonly contactUsService: ContactUsService) {}

    @CreateResourceCombinedDecorators({
        path: 'create',
        responseType: CreateContactUsResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async createContactUs(
        @Body() dto: CreateContactUsRequestDto,
    ): Promise<CreateContactUsResponseDto> {
        const model = CreateContactUsModel.fromDto(dto);
        const contactUs = await this.contactUsService.createContactUs(model);
        return CreateContactUsResponseDto.fromModel(contactUs);
    }

    @ReadResourceCombinedDecorators({
        path: 'get',
        responseType: ReadContactUsResponseDto,
        additionalErrors: ['notFound'],
        public: true,
    })
    async getContactUs(): Promise<ReadContactUsResponseDto | null> {
        const contactUs = await this.contactUsService.getContactUs();
        return contactUs ? ReadContactUsResponseDto.fromModel(contactUs) : null;
    }

    /** ✅ Update Contact Us */
    @PatchResourceCombinedDecorators({
        path: 'update',
        responseType: UpdateContactUsResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
    })
    async updateContactUs(
        @Body() dto: UpdateContactUsRequestDto,
    ): Promise<UpdateContactUsResponseDto> {
        // Get existing record to get the ID
        const existing = await this.contactUsService.getContactUs();
        if (!existing) {
            throw new NotFoundException('Contact information not found. Use create or upsert endpoint.');
        }
        
        const model = UpdateContactUsModel.fromDto(dto, existing.id);
        const contactUs = await this.contactUsService.updateContactUs(model);
        return UpdateContactUsResponseDto.fromModel(contactUs);
    }

    /** ✅ Upsert Contact Us (Update or Create) */
    @CreateResourceCombinedDecorators({
        path: 'upsert',
        responseType: CreateContactUsResponseDto,
    })
    async upsertContactUs(
        @Body() dto: CreateContactUsRequestDto,
    ): Promise<CreateContactUsResponseDto> {
        const model = CreateContactUsModel.fromDto(dto);
        const contactUs = await this.contactUsService.upsertContactUs(model);
        return CreateContactUsResponseDto.fromModel(contactUs);
    }
}
