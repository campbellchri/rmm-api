// import { Injectable, UnauthorizedException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
// import { FirebaseService } from 'src/common/services/firebase/firebase.service';
// import { PinoLogger } from 'nestjs-pino';
// import * as admin from 'firebase-admin';
// import { JwtService } from '@nestjs/jwt';

// export interface FirebaseTokenVerificationResult {
//   accessToken: string;
//   refreshToken: string;
//   user: UserReadModel;
//   isNewUser: boolean;
// }

// @Injectable()
// export class FirebaseAuthService {
//   constructor(
//     private readonly firebaseService: FirebaseService,
//     private readonly usersService: UsersService,
//     private readonly jwtTokenService: JWTTokenService,
//     private readonly logger: PinoLogger,
//     private readonly jwtService: JwtService,
//   ) { }


//   async verifyFirebaseTokenAndCreateSession(
//     firebaseIdToken: string,
//   ): Promise<FirebaseTokenVerificationResult> {
//     try {
//       let decodedToken: admin.auth.DecodedIdToken;

//       // Step 1: Try to verify as ID token first, then handle custom tokens
//       try {
//         decodedToken = await this.firebaseService.getDecodedIdToken(firebaseIdToken);
//       } catch (verifyError) {
//         // Check for specific Firebase error codes first
//         if (verifyError.code === 'auth/id-token-expired') {
//           throw new UnauthorizedException('Firebase token has expired');
//         }
        
//         if (verifyError.code === 'auth/id-token-revoked') {
//           throw new UnauthorizedException('Firebase token has been revoked');
//         }
        
//         // If verification fails, try to decode as custom token
//         try {
//           const decoded = await this.jwtTokenService.decodeToken(firebaseIdToken);
//           if (decoded && decoded.uid) {
//             // Get user record from Firebase using UID
//             const userRecord = await this.firebaseService.getUserByUid(decoded.uid);
//             // Convert to DecodedIdToken format
//             decodedToken = {
//               uid: userRecord.uid,
//               email: userRecord.email,
//               phone_number: userRecord.phoneNumber,
//               name: userRecord.displayName,
//               firebase: {
//                 sign_in_provider: 'custom',
//                 identities: {},
//               },
//               aud: '',
//               auth_time: Math.floor(Date.now() / 1000),
//               exp: decoded.exp || Math.floor(Date.now() / 1000) + 3600,
//               iat: decoded.iat || Math.floor(Date.now() / 1000),
//               iss: '',
//               sub: userRecord.uid,
//               email_verified: userRecord.emailVerified || false,
//             } as admin.auth.DecodedIdToken;
//           } else {
//             throw new UnauthorizedException('Invalid token format');
//           }
//         } catch (customTokenError) {
//           this.logger.error(`Token verification failed: ${customTokenError.message}`);
//           throw new UnauthorizedException('Invalid Firebase token');
//         }
//       }

//       this.logger.info(`Firebase token verified for user: ${decodedToken.uid}`);

//       // Step 2: Check if user exists in our database
//       let user = await this.findExistingUser(decodedToken);
//       let isNewUser = false;

//       // Step 3: Create user if doesn't exist
//       if (!user) {
//         user = await this.createUserFromFirebaseToken(decodedToken);
//         isNewUser = true;
//         this.logger.info(`Created new user from Firebase token: ${user.id}`);
//       } else {
//         // Update user info if needed
//         user = await this.updateUserFromFirebaseToken(user, decodedToken);
//         this.logger.info(`Found existing user: ${user.id}`);
//       }

//       // Step 4: Generate server session tokens
//       const accessToken = await this.jwtTokenService.generateAccessToken(user);
//       const refreshToken = await this.jwtTokenService.generateRefreshToken(user.id);

//       return {
//         accessToken,
//         refreshToken,
//         user,
//         isNewUser,
//       };
//     } catch (error) {
//       this.logger.error(`Firebase token verification failed: ${error.message}`);

//       if (error.code === 'auth/id-token-expired') {
//         throw new UnauthorizedException('Firebase token has expired');
//       }

//       if (error.code === 'auth/id-token-revoked') {
//         throw new UnauthorizedException('Firebase token has been revoked');
//       }

//       if (error.code === 'auth/invalid-id-token') {
//         throw new UnauthorizedException('Invalid Firebase token');
//       }

//       if (error instanceof UnauthorizedException) {
//         throw error;
//       }

//       throw new InternalServerErrorException('Failed to verify Firebase token');
//     }
//   }

//   /**
//    * Refresh Firebase token and update session
//    */
//   async refreshFirebaseSession(
//     firebaseIdToken: string,
//     serverRefreshToken: string,
//   ): Promise<{ accessToken: string; refreshToken: string }> {
//     try {
//       // Verify the refresh token first
//       const refreshPayload = await this.jwtTokenService.verifyRefreshToken(serverRefreshToken);

//       // Verify the new Firebase token (handle both ID tokens and custom tokens)
//       let decodedToken: admin.auth.DecodedIdToken;

//       try {
//         // Try to verify as ID token first
//         decodedToken = await this.firebaseService.getDecodedIdToken(firebaseIdToken);
//       } catch (error) {
//         // If ID token verification fails, try custom token handling
//         if (error.message.includes('no "kid" claim') || error.message.includes('Invalid token')) {
//           const decoded = this.decodeJwtToken(firebaseIdToken);
//           if (decoded && decoded.uid) {
//             // Get user record from Firebase using UID
//             const userRecord = await this.firebaseService.getUserByUid(decoded.uid);
//             // Convert to DecodedIdToken format
//             decodedToken = {
//               uid: userRecord.uid,
//               email: userRecord.email,
//               phone_number: userRecord.phoneNumber,
//               name: userRecord.displayName,
//               firebase: {
//                 sign_in_provider: 'custom',
//                 identities: {},
//               },
//               aud: '',
//               auth_time: Math.floor(Date.now() / 1000),
//               exp: decoded.exp || Math.floor(Date.now() / 1000) + 3600,
//               iat: decoded.iat || Math.floor(Date.now() / 1000),
//               iss: '',
//               sub: userRecord.uid,
//               email_verified: userRecord.emailVerified || false,
//             } as admin.auth.DecodedIdToken;
//           } else {
//             throw new UnauthorizedException('Invalid Firebase token');
//           }
//         } else {
//           throw error;
//         }
//       }

//       // Ensure the tokens belong to the same user
//       if (refreshPayload.sub !== decodedToken.uid) {
//         throw new UnauthorizedException('Token mismatch');
//       }

//       // Get user and generate new tokens
//       const user = await this.usersService.findById(decodedToken.uid);
//       if (!user) {
//         throw new UnauthorizedException('User not found');
//       }

//       const accessToken = await this.jwtTokenService.generateAccessToken(user);
//       const refreshToken = await this.jwtTokenService.generateRefreshToken(user.id);

//       return { accessToken, refreshToken };

//     } catch (error) {
//       this.logger.error(`Token refresh failed: ${error.message}`);
      
//       // Preserve specific error messages for token mismatch and other auth issues
//       if (error instanceof UnauthorizedException) {
//         throw error;
//       }
      
//       throw new UnauthorizedException('Failed to refresh tokens');
//     }
//   }

//   /**
//    * Find existing user by Firebase UID, email, or phone
//    */
//   private async findExistingUser(decodedToken: admin.auth.DecodedIdToken): Promise<UserReadModel | null> {
//     try {
//       // First try to find by Firebase UID
//       const userByUid = await this.usersService.findById(decodedToken.uid);
//       if (userByUid) {
//         return userByUid;
//       }

//       // Then try by email if available
//       if (decodedToken.email) {
//         const userByEmail = await this.usersService.findByEmail(decodedToken.email);
//         if (userByEmail) {
//           return UserReadModel.fromEntity(userByEmail);
//         }
//       }

//       // Try by phone if available
//       if (decodedToken.phone_number) {
//         const phoneNumber = this.extractPhoneNumber(decodedToken.phone_number);
//         const callingCode = this.extractCallingCode(decodedToken.phone_number);

//         if (phoneNumber && callingCode) {
//           const userByPhone = await this.usersService.findByPhone(phoneNumber, callingCode);
//           if (userByPhone) {
//             return userByPhone;
//           }
//         }
//       }

//       return null;
//     } catch (error) {
//       this.logger.error(`Error finding existing user: ${error.message}`);
//       return null;
//     }
//   }

//   /**
//    * Create new user from Firebase token
//    */
//   private async createUserFromFirebaseToken(
//     decodedToken: admin.auth.DecodedIdToken,
//   ): Promise<UserReadModel> {
//     const phoneNumber = decodedToken.phone_number ? this.extractPhoneNumber(decodedToken.phone_number) : null;
//     const callingCode = decodedToken.phone_number ? this.extractCallingCode(decodedToken.phone_number) : null;

//     const createUserModel: CreateUserModel = {
//       id: decodedToken.uid, // Use Firebase UID as our user ID
//       name: decodedToken.name || 'Unknown',
//       surName: '', // Firebase doesn't separate first/last name
//       email: decodedToken.email || null,
//       phoneNumber: phoneNumber,
//       callingCode: callingCode,
//       countryCode: null,
//       authProvider: this.determineAuthProvider(decodedToken),
//       status: USER_STATUS.ACTIVE,
//       roleId: USER_ROLES.USER,
//     };

//     const createdUser = await this.usersService.create(createUserModel);
//     return createdUser;
//   }

//   /**
//    * Update existing user with Firebase token data
//    */
//   private async updateUserFromFirebaseToken(
//     user: UserReadModel,
//     decodedToken: admin.auth.DecodedIdToken,
//   ): Promise<UserReadModel> {
//     // Update verification status if needed
//     let needsUpdate = false;
//     const updates: any = {};

//     if (decodedToken.phone_number && !user.isPhoneNumberVerified) {
//       updates.isPhoneNumberVerified = true;
//       needsUpdate = true;
//     }

//     if (needsUpdate) {
//       // You might need to implement an update method in UsersService
//       this.logger.info(`Updating user verification status: ${user.id}`);
//     }

//     return user;
//   }


//   private determineAuthProvider(decodedToken: admin.auth.DecodedIdToken): UserAuthProvider {
//     if (decodedToken.firebase?.sign_in_provider === 'google.com') {
//       return USER_AUTH_PROVIDER.GOOGLE;
//     }
//     if (decodedToken.firebase?.sign_in_provider === 'apple.com') {
//       return USER_AUTH_PROVIDER.APPLE;
//     }
//     if (decodedToken.firebase?.sign_in_provider === 'phone') {
//       return USER_AUTH_PROVIDER.PHONE;
//     }
//     return USER_AUTH_PROVIDER.FIREBASE;
//   }

//   /**
//    * Extract phone number from Firebase phone format (+1234567890)
//    */
//   private extractPhoneNumber(firebasePhone: string): string | null {
//     // For Kuwait: +9651234567890 -> should extract 1234567890
//     // For other countries: +11234567890 -> should extract 1234567890
//     if (firebasePhone.startsWith('+965')) {
//       return firebasePhone.substring(4); // Remove +965
//     }
//     // For other country codes, extract after the country code
//     const match = firebasePhone.match(/^\+\d{1,3}(\d+)$/);
//     return match ? match[1] : null;
//   }

//   /**
//    * Extract calling code from Firebase phone format (+1234567890)
//    */
//   private extractCallingCode(firebasePhone: string): string | null {
//     // For Kuwait: +9651234567890 -> should extract +965
//     if (firebasePhone.startsWith('+965')) {
//       return '+965';
//     }
//     // For other country codes
//     const match = firebasePhone.match(/^(\+\d{1,3})\d+$/);
//     return match ? match[1] : null;
//   }

//   /**
//    * Decode JWT token without verification (for custom tokens)
//    */
//   private decodeJwtToken(token: string): any {
//     try {
//       return this.jwtService.decode(token);
//     } catch (error) {
//       this.logger.error(`Failed to decode JWT token: ${error.message}`);
//       return null;
//     }
//   }
// }
