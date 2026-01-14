import { forwardRef, Module } from '@nestjs/common';
import { DatabaseUserTributesModule } from 'src/common/database/userTributes/database-user-tributes.module';
import { UserTributeController } from './controllers/user-tributes.controller';
import { UserTributeService } from './services/user-tributes.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';



@Module({
    imports: [DatabaseUserTributesModule, JwtTokenModule],
    controllers: [UserTributeController],
    providers: [UserTributeService],
    exports: [UserTributeService],
})
export class UserTributeModule { }