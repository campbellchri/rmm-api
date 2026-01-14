import { Injectable } from '@nestjs/common';
import { initializeApp, cert, App } from 'firebase-admin/app';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseClientService {
  public firebaseInstance: App;

  constructor(private readonly configService: ConfigService) {
    const firebaseConfig = this.configService.get<ServiceAccount>('firebase');

    // Make Firebase optional - only initialize if valid config exists
    // Check both project_id and projectId since config uses project_id but TypeScript expects projectId
    const projectId = (firebaseConfig as any)?.project_id || firebaseConfig?.projectId;
    if (firebaseConfig && projectId && projectId !== 'placeholder') {
      try {
        this.firebaseInstance = initializeApp({
          credential: cert(firebaseConfig),
        });
        console.log('Firebase initialized successfully');
      } catch (error) {
        console.warn('Firebase initialization failed, running without Firebase:', error.message);
        this.firebaseInstance = null;
      }
    } else {
      console.warn('Firebase configuration not found or invalid, running without Firebase features');
      this.firebaseInstance = null;
    }
  }
}
