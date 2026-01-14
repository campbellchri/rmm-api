import { Module } from '@nestjs/common';
import { DatabaseContactUsModule } from 'src/common/database/contactUs/database-contact-us.module';
import { ContactUsController } from './controllers/contact-us.controller';
import { ContactUsService } from './services/contact-us.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseContactUsModule, JwtTokenModule],
    controllers: [ContactUsController],
    providers: [ContactUsService],
    exports: [ContactUsService],
})
export class ContactUsModule { }
