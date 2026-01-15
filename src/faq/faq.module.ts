import { Module } from '@nestjs/common';
import { DatabaseFaqModule } from 'src/common/database/faq/database-faq.module';
import { FaqController } from './controllers/faq.controller';
import { FaqService } from './services/faq.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseFaqModule, JwtTokenModule],
    controllers: [FaqController],
    providers: [FaqService],
    exports: [FaqService],
})
export class FaqModule { }
