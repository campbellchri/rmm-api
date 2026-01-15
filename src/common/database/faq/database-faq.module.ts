import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { FaqCategoryRepository } from './repositories/faq-category.repository';
import { FaqItemRepository } from './repositories/faq-item.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [FaqCategoryRepository, FaqItemRepository],
    exports: [FaqCategoryRepository, FaqItemRepository],
})
export class DatabaseFaqModule { }
