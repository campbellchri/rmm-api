import { forwardRef, Module } from '@nestjs/common';
import { DatabaseTemplateModule } from 'src/common/database/templates/database-templates.module';
import { TemplateService } from './services/templates.service';
import { TemplateController } from './controllers/templates.controller';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';


@Module({
    imports: [DatabaseTemplateModule, JwtTokenModule],
    controllers: [TemplateController],
    providers: [TemplateService],
    exports: [TemplateService],
})
export class TemplateModule { }
