import { Body, Controller, Param } from '@nestjs/common';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { FaqService } from '../services/faq.service';
import { ReadFaqCategoryResponseDto } from '../dtos/response/read-faq-category-response.dto';
import { ReadFaqItemResponseDto } from '../dtos/response/read-faq-item-response.dto';
import { CreateFaqCategoryRequestDto } from '../dtos/request/create-faq-category-request.dto';
import { UpdateFaqCategoryRequestDto } from '../dtos/request/update-faq-category-request.dto';
import { CreateFaqItemRequestDto } from '../dtos/request/create-faq-item-request.dto';
import { UpdateFaqItemRequestDto } from '../dtos/request/update-faq-item-request.dto';
import { CreateFaqCategoryResponseDto } from '../dtos/response/create-faq-category-response.dto';
import { UpdateFaqCategoryResponseDto } from '../dtos/response/update-faq-category-response.dto';
import { CreateFaqItemResponseDto } from '../dtos/response/create-faq-item-response.dto';
import { UpdateFaqItemResponseDto } from '../dtos/response/update-faq-item-response.dto';
import { CreateFaqCategoryModel } from '../models/create-faq-category-model';
import { UpdateFaqCategoryModel } from '../models/update-faq-category-model';
import { CreateFaqItemModel } from '../models/create-faq-item-model';
import { UpdateFaqItemModel } from '../models/update-faq-item-model';

@Controller('faq')
export class FaqController {
    constructor(private readonly faqService: FaqService) {}

    /** ✅ Get All FAQ Categories with Items */
    @ReadResourceCombinedDecorators({
        path: '/categories',
        responseType: ReadFaqCategoryResponseDto,
        public: true,
    })
    async getAllCategories(): Promise<ReadFaqCategoryResponseDto[]> {
        const models = await this.faqService.getAllCategories();
        return ReadFaqCategoryResponseDto.fromModels(models);
    }

    /** ✅ Get FAQ Category by ID with Items */
    @ReadResourceCombinedDecorators({
        path: '/categories/:id',
        responseType: ReadFaqCategoryResponseDto,
        additionalErrors: ['notFound'],
        public: true,
    })
    async getCategoryById(
        @Param('id') id: string,
    ): Promise<ReadFaqCategoryResponseDto> {
        const model = await this.faqService.getCategoryById(id);
        return ReadFaqCategoryResponseDto.fromModel(model);
    }

    /** ✅ Get All FAQ Items */
    @ReadResourceCombinedDecorators({
        path: '/items',
        responseType: ReadFaqItemResponseDto,
        public: true,
    })
    async getAllItems(): Promise<ReadFaqItemResponseDto[]> {
        const models = await this.faqService.getAllItems();
        return ReadFaqItemResponseDto.fromModels(models);
    }

    /** ✅ Get FAQ Item by ID */
    @ReadResourceCombinedDecorators({
        path: '/items/:id',
        responseType: ReadFaqItemResponseDto,
        additionalErrors: ['notFound'],
        public: true,
    })
    async getItemById(
        @Param('id') id: string,
    ): Promise<ReadFaqItemResponseDto> {
        const model = await this.faqService.getItemById(id);
        return ReadFaqItemResponseDto.fromModel(model);
    }

    /** ✅ Get FAQ Items by Category ID */
    @ReadResourceCombinedDecorators({
        path: '/categories/:categoryId/items',
        responseType: ReadFaqItemResponseDto,
        public: true,
    })
    async getItemsByCategoryId(
        @Param('categoryId') categoryId: string,
    ): Promise<ReadFaqItemResponseDto[]> {
        const models = await this.faqService.getItemsByCategoryId(categoryId);
        return ReadFaqItemResponseDto.fromModels(models);
    }

    /** ✅ Create FAQ Category */
    @CreateResourceCombinedDecorators({
        path: '/categories',
        responseType: CreateFaqCategoryResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
        public: true,
    })
    async createCategory(
        @Body() dto: CreateFaqCategoryRequestDto,
    ): Promise<CreateFaqCategoryResponseDto> {
        const model = CreateFaqCategoryModel.fromDto(dto);
        const created = await this.faqService.createCategory(model);
        return CreateFaqCategoryResponseDto.fromModel(created);
    }

    /** ✅ Update FAQ Category */
    @PatchResourceCombinedDecorators({
        path: '/categories/:id',
        responseType: UpdateFaqCategoryResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
        public: true,
    })
    async updateCategory(
        @Param('id') id: string,
        @Body() dto: UpdateFaqCategoryRequestDto,
    ): Promise<UpdateFaqCategoryResponseDto> {
        const model = UpdateFaqCategoryModel.fromDto(dto, id);
        const updated = await this.faqService.updateCategory(model);
        return UpdateFaqCategoryResponseDto.fromModel(updated);
    }

    /** ✅ Delete FAQ Category */
    @DeleteResourceCombinedDecorators({
        path: '/categories/:id',
        responseType: ReadFaqCategoryResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async deleteCategory(@Param('id') id: string): Promise<{ id: string }> {
        return await this.faqService.deleteCategory(id);
    }

    /** ✅ Create FAQ Item */
    @CreateResourceCombinedDecorators({
        path: '/items',
        responseType: CreateFaqItemResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
        public:true,
    })
    async createItem(
        @Body() dto: CreateFaqItemRequestDto,
    ): Promise<CreateFaqItemResponseDto> {
        const model = CreateFaqItemModel.fromDto(dto);
        const created = await this.faqService.createItem(model);
        return CreateFaqItemResponseDto.fromModel(created);
    }

    /** ✅ Update FAQ Item */
    @PatchResourceCombinedDecorators({
        path: '/items/:id',
        responseType: UpdateFaqItemResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
        public:true,
    })
    async updateItem(
        @Param('id') id: string,
        @Body() dto: UpdateFaqItemRequestDto,
    ): Promise<UpdateFaqItemResponseDto> {
        const model = UpdateFaqItemModel.fromDto(dto, id);
        const updated = await this.faqService.updateItem(model);
        return UpdateFaqItemResponseDto.fromModel(updated);
    }

    /** ✅ Delete FAQ Item */
    @DeleteResourceCombinedDecorators({
        path: '/items/:id',
        responseType: ReadFaqItemResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async deleteItem(@Param('id') id: string): Promise<{ id: string }> {
        return await this.faqService.deleteItem(id);
    }
}
