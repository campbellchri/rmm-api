import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LegalDocumentService } from '../services/legal-document.service';
import {
    CreateResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateLegalDocumentRequestDto } from '../dtos/request/create-legal-document-request.dto';
import { UpdateLegalDocumentRequestDto } from '../dtos/request/update-legal-document-request.dto';
import { CreateLegalDocumentResponseDto } from '../dtos/response/create-legal-document-response.dto';
import { UpdateLegalDocumentResponseDto } from '../dtos/response/update-legal-document-response.dto';
import { ReadLegalDocumentResponseDto } from '../dtos/response/read-legal-document-response.dto';
import { CreateLegalDocumentModel } from '../models/create-legal-document-model';
import { UpdateLegalDocumentModel } from '../models/update-legal-document-model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('legal-documents')
export class LegalDocumentController {
    constructor(private readonly legalDocumentService: LegalDocumentService) {}

    /** ✅ Create Legal Document */
    @ApiOperation({ summary: 'Create a legal document (Privacy Policy or Terms and Conditions)' })
    @ApiResponse({ status: 201, type: CreateLegalDocumentResponseDto })
    @CreateResourceCombinedDecorators({
        responseType: CreateLegalDocumentResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
        public: true,
    })
    async createLegalDocument(
        @Body() dto: CreateLegalDocumentRequestDto,
    ): Promise<CreateLegalDocumentResponseDto> {
        const model = CreateLegalDocumentModel.fromDto(dto);
        const document = await this.legalDocumentService.createLegalDocument(model);
        return CreateLegalDocumentResponseDto.fromModel(document);
    }

    /** ✅ Get Legal Document by ID */
    @ApiOperation({ summary: 'Get a legal document by ID' })
    @ApiResponse({ status: 200, type: ReadLegalDocumentResponseDto })
    @ReadResourceCombinedDecorators({
        path: 'readById/:id',
        responseType: ReadLegalDocumentResponseDto,
        additionalErrors: ['notFound'],
        public: true,
    })
    async getLegalDocumentById(
        @Param('id') id: string,
    ): Promise<ReadLegalDocumentResponseDto> {
        const document = await this.legalDocumentService.getLegalDocumentById(id);
        return ReadLegalDocumentResponseDto.fromModel(document);
    }

    /** ✅ Get Legal Document by Type */
    @ApiOperation({ summary: 'Get a legal document by type (privacy_policy or terms_and_conditions)' })
    @ApiResponse({ status: 200, type: ReadLegalDocumentResponseDto })
    @ReadResourceCombinedDecorators({
        path: 'type/:type',
        responseType: ReadLegalDocumentResponseDto,
        public: true,
    })
    async getLegalDocumentByType(
        @Param('type') type: string,
    ): Promise<ReadLegalDocumentResponseDto | null> {
        const document = await this.legalDocumentService.getLegalDocumentByType(type);
        return document ? ReadLegalDocumentResponseDto.fromModel(document) : null;
    }

    /** ✅ Get All Legal Documents */
    @ApiOperation({ summary: 'Get all legal documents' })
    @ApiResponse({ status: 200, type: [ReadLegalDocumentResponseDto] })
    @ReadResourceCombinedDecorators({
        responseType: ReadLegalDocumentResponseDto,
        public: true,
    })
    async getAllLegalDocuments(): Promise<ReadLegalDocumentResponseDto[]> {
        const documents = await this.legalDocumentService.getAllLegalDocuments();
        return ReadLegalDocumentResponseDto.fromModels(documents);
    }

    /** ✅ Update Legal Document */
    @ApiOperation({ summary: 'Update a legal document' })
    @ApiResponse({ status: 200, type: UpdateLegalDocumentResponseDto })
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateLegalDocumentResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
        public: true,
    })
    async updateLegalDocument(
        @Param('id') id: string,
        @Body() dto: UpdateLegalDocumentRequestDto,
    ): Promise<UpdateLegalDocumentResponseDto> {
        const model = UpdateLegalDocumentModel.fromDto(dto, id);
        const document = await this.legalDocumentService.updateLegalDocument(model);
        return UpdateLegalDocumentResponseDto.fromModel(document);
    }

    /** ✅ Upsert Legal Document (Update or Create) */
    @ApiOperation({ summary: 'Update or create a legal document by type (creates if not exists, updates if exists)' })
    @ApiResponse({ status: 200, type: CreateLegalDocumentResponseDto })
    @CreateResourceCombinedDecorators({
        path: 'upsert/:type',
        responseType: CreateLegalDocumentResponseDto,
        public:true
    })
    async upsertLegalDocument(
        @Param('type') type: string,
        @Body() dto: CreateLegalDocumentRequestDto,
    ): Promise<CreateLegalDocumentResponseDto> {
        const model = CreateLegalDocumentModel.fromDto(dto);
        const document = await this.legalDocumentService.upsertLegalDocument(type, model);
        return CreateLegalDocumentResponseDto.fromModel(document);
    }
}
