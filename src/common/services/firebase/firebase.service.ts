import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
    private async configFirebase() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
            });
        }
    }

    public async createUserByEmailAndPassword(
        email: string,
        password: string,
        displayName: string
    ): Promise<{ uid: string; customToken: string }> {
        await this.configFirebase();

        try {
            const userRecord = await admin.auth().createUser({ email, password, displayName });
            const customToken = await admin.auth().createCustomToken(userRecord.uid);
            return { uid: userRecord.uid, customToken };
        } catch (error) {
            this.handleFirebaseAuthErrors(error);
        }
    }

    public async createUserWithoutPassword(
        email: string,
        displayName: string
    ): Promise<{ uid: string; customToken: string }> {
        await this.configFirebase();

        try {
            const userRecord = await admin.auth().createUser({ email, displayName });
            const customToken = await admin.auth().createCustomToken(userRecord.uid);
            return { uid: userRecord.uid, customToken };
        } catch (error) {
            this.handleFirebaseAuthErrors(error);
        }
    }

    // Get a decoded ID token based on the user ID
    public async getDecodedIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
        await this.configFirebase();

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to decode user ID token: ${error.message}`);
        }
    }

    // Get Firebase user by UID
    public async getUserByUid(uid: string): Promise<admin.auth.UserRecord> {
        await this.configFirebase();

        try {
            const userRecord = await admin.auth().getUser(uid);
            if (!userRecord) {
                throw new NotFoundException(`User with UID ${uid} not found`);
            }
            return userRecord;

        } catch (error) {
            throw new InternalServerErrorException(`Failed to retrieve user by UID: ${error.message}`);
        }
    }

    // Custom token verification (e.g., after logging in)
    public async verifyCustomToken(token: string): Promise<admin.auth.DecodedIdToken> {
        await this.configFirebase();

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to verify custom token: ${error.message}`);
        }
    }

    public async createCustomToken(uid: string): Promise<any> {
        await this.configFirebase();

        try {
            const customToken = await admin.auth().createCustomToken(uid);
            return customToken;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to create custom token: ${error.message}`);
        }
    }

    // Private method to handle Firebase authentication-related errors
    private handleFirebaseAuthErrors(error: any): never {
        if (error.code === 'auth/email-already-exists') {
            throw new ConflictException('The email address is already in use by another account.');
        } else if (error.code === 'auth/invalid-email') {
            throw new ConflictException('The email address is invalid.');
        } else if (error.code === 'auth/weak-password') {
            throw new ConflictException('The password is too weak.');
        } else if (error.code === 'auth/user-not-found') {
            throw new NotFoundException('User not found.');
        } else {
            throw new InternalServerErrorException(`Firebase error: ${error.message}`);
        }
    }
}
