import { Global, Module } from '@nestjs/common';
import { FirebaseClientModule } from '../firebaseClient/firebase-client.module';
import { AuthProviderService } from './auth-provider.service';

@Global()
@Module({
  imports: [FirebaseClientModule],
  providers: [AuthProviderService],
  exports: [AuthProviderService],
})
export class AuthProviderModule {}
