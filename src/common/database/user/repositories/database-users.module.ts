import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../../database.module';
import { UserRepository } from './user.repository';


@Module({
  imports: [DatabaseConnectionModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseUsersModule { }
