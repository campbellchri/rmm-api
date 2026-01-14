import { Injectable } from '@nestjs/common';
import { initializeApp, cert, App } from 'firebase-admin/app';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseClientService {
  public firebaseInstance: App;

  constructor(private readonly configService: ConfigService) {
    const firebaseConfig = this.configService.get<ServiceAccount>('firebase');

    if (!firebaseConfig) {
      throw new Error('Firebase credentials not found in config');
    }

    this.firebaseInstance = initializeApp({
      credential: cert(firebaseConfig),
    });
  }
}
