import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Auth, DecodedIdToken, getAuth, UserRecord } from 'firebase-admin/auth';
import { PinoLogger } from 'nestjs-pino';
import * as util from 'util';
import { FirebaseClientService } from '../firebaseClient/firebase-client.service';

@Injectable()
export class AuthProviderService {
  auth: Auth;
  constructor(firebaseClientService: FirebaseClientService, private readonly logger: PinoLogger) {
    this.auth = getAuth(firebaseClientService.firebaseInstance);
  }

  async validateToken(token: string): Promise<DecodedIdToken> {
    // console.log(this.auth.verifyIdToken(token), "this.auth.verifyIdToken(token)");

    return this.auth.verifyIdToken(token);
  }

  async getUserByEmail(email: string): Promise<UserRecord> {
    try {
      return this.auth.getUserByEmail(email);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong', {
        cause: new Error(`Getting firebase user by email failed; ${util.inspect(e)}`),
      });
    }
  }

  async getUserByUID(uid: string): Promise<UserRecord> {
    try {
      return this.auth.getUser(uid);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong', {
        cause: new Error(`Getting firebase user by uid failed; ${util.inspect(e)}`),
      });
    }
  }

  async deleteUser(uid: string): Promise<void> {
    try {
      await this.auth.deleteUser(uid);
      this.logger.info(`Deleting firebase user with uid: ${uid} successfull`);
    } catch (e) {
      throw new InternalServerErrorException('Error while deleting auth user', {
        cause: new Error(`Deleting firebase user by uid $ failed; ${util.inspect(e)}`),
      });
    }
  }
}

