import { MiddlewareConsumer, Module, NestModule, RequestMethod, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptionsGetter, loggerModuleOptionsGetter } from './common/configuration/optionsGetter';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseConnectionModule } from './common/database/database.module';
import { DatabaseUsersModule } from './common/database/user/repositories/database-users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import * as dotenv from 'dotenv';
import { AuthProviderModule } from './common/providers/authProvider/auth-provider.module';
import { UsersModule } from './users/users.module';
import { LandingModeModule } from './landingMode/landing-mode.module';
import { TemplateModule } from './templates/templates.module';
import { MemorialModule } from './memorials/memorials.module';
import { UserMediaModule } from './userMedia/user-media.module';
import { UserTributeModule } from './userTributes/user-tributes.module';
import { UserNotificationSettingsModule } from './userNotificationSettings/user-notification-settings.module';
import { UserAnswersModule } from './userAnswers/user-answers-module';
import { UserQuestionnaireModule } from './userQuestionnaire/user-questionnaire-module';
import { UserQuestionnaireAnswersModule } from './userQuestionnaireAnswers/user-questionnaire-answers-module';
import { MemorialSayingsModule } from './memorialSayings/memorial-sayings.module';
import { MemorialQRCodesModule } from './memorialQRCodes/memorial-qr-codes.module';
import { UserFeaturedMemorialsModule } from './userFeaturedMemorials/user-featured-memorials.module';
import { ContactUsModule } from './contactUs/contact-us.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { LegalDocumentsModule } from './legalDocuments/legal-documents.module';
import { SubscriptionPackagesModule } from './subscriptionPackages/subscription-packages.module';
import { AuthModule } from './auth/auth.module';
import { JwtTokenModule } from './common/jwtToken/jwtToken.module';
dotenv.config({ path: '.env' });
@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptionsGetter()),
    LoggerModule.forRootAsync(loggerModuleOptionsGetter()),
    DatabaseConnectionModule,
    DatabaseUsersModule,
    AuthProviderModule,
    JwtTokenModule, // Make JWT service available globally
    UsersModule,
    LandingModeModule,
    TemplateModule,
    MemorialModule,
    UserMediaModule,
    UserTributeModule,
    MemorialSayingsModule,
    MemorialQRCodesModule,
    UserFeaturedMemorialsModule,
    ContactUsModule,
    ComplaintsModule,
    LegalDocumentsModule,
    SubscriptionPackagesModule,
    UserNotificationSettingsModule,
    UserAnswersModule,
    UserQuestionnaireModule,
    UserQuestionnaireAnswersModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      scope: Scope.REQUEST,
      useClass: RolesGuard,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
