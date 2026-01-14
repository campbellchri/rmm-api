import { Global, Module } from '@nestjs/common';
import { FirebaseClientService } from './firebase-client.service';

@Global()
@Module({
  providers: [FirebaseClientService],
  exports: [FirebaseClientService],
})
export class FirebaseClientModule {}
