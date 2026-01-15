import { Injectable } from '@nestjs/common';
import { FaqCategoryRepository } from 'src/common/database/faq/repositories/faq-category.repository';
import { FaqItemRepository } from 'src/common/database/faq/repositories/faq-item.repository';
import { FaqCategoryReadModel } from '../models/read-faq-category-model';
import { FaqItemReadModel } from '../models/read-faq-item-model';
import { CreateFaqCategoryModel } from '../models/create-faq-category-model';
import { UpdateFaqCategoryModel } from '../models/update-faq-category-model';
import { CreateFaqItemModel } from '../models/create-faq-item-model';
import { UpdateFaqItemModel } from '../models/update-faq-item-model';

@Injectable()
export class FaqService {
    constructor(
        private readonly faqCategoryRepository: FaqCategoryRepository,
        private readonly faqItemRepository: FaqItemRepository,
    ) {}

    /** ✅ Get All FAQ Categories with Items */
    async getAllCategories(): Promise<FaqCategoryReadModel[]> {
        const entities = await this.faqCategoryRepository.getAll();
        return FaqCategoryReadModel.fromEntities(entities);
    }

    /** ✅ Get FAQ Category by ID with Items */
    async getCategoryById(id: string): Promise<FaqCategoryReadModel> {
        const entity = await this.faqCategoryRepository.getById(id);
        return FaqCategoryReadModel.fromEntity(entity);
    }

    /** ✅ Create FAQ Category */
    async createCategory(model: CreateFaqCategoryModel): Promise<{ id: string }> {
        const entity = await this.faqCategoryRepository.create(model);
        return { id: entity.id };
    }

    /** ✅ Update FAQ Category */
    async updateCategory(model: UpdateFaqCategoryModel): Promise<{ id: string }> {
        return await this.faqCategoryRepository.update(model);
    }

    /** ✅ Delete FAQ Category */
    async deleteCategory(id: string): Promise<{ id: string }> {
        return await this.faqCategoryRepository.delete(id);
    }

    /** ✅ Get All FAQ Items */
    async getAllItems(): Promise<FaqItemReadModel[]> {
        const entities = await this.faqItemRepository.getAll();
        return FaqItemReadModel.fromEntities(entities);
    }

    /** ✅ Get FAQ Item by ID */
    async getItemById(id: string): Promise<FaqItemReadModel> {
        const entity = await this.faqItemRepository.getById(id);
        return FaqItemReadModel.fromEntity(entity);
    }

    /** ✅ Get FAQ Items by Category ID */
    async getItemsByCategoryId(categoryId: string): Promise<FaqItemReadModel[]> {
        const entities = await this.faqItemRepository.getByCategoryId(categoryId);
        return FaqItemReadModel.fromEntities(entities);
    }

    /** ✅ Create FAQ Item */
    async createItem(model: CreateFaqItemModel): Promise<{ id: string }> {
        const entity = await this.faqItemRepository.create(model);
        return { id: entity.id };
    }

    /** ✅ Update FAQ Item */
    async updateItem(model: UpdateFaqItemModel): Promise<{ id: string }> {
        return await this.faqItemRepository.update(model);
    }

    /** ✅ Delete FAQ Item */
    async deleteItem(id: string): Promise<{ id: string }> {
        return await this.faqItemRepository.delete(id);
    }
}
