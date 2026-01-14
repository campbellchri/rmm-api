import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { ContactUsRepository } from './repositories/contact-us.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [ContactUsRepository],
    exports: [ContactUsRepository],
})
export class DatabaseContactUsModule { }
