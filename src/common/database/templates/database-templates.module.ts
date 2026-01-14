import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { TemplateRepository } from './repositories/templates.repository';



@Module({
    imports: [DatabaseConnectionModule],
    providers: [TemplateRepository],
    exports: [TemplateRepository],
})
export class DatabaseTemplateModule { }