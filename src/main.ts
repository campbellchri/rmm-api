// main.ts
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { configureSwagger } from './swagger';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') ?? 4000;
  const basePath = configService.get<string>('basePath', '');

  // Set global prefix if basePath is configured
  if (basePath) {
    app.setGlobalPrefix(basePath);
  }

  // Logger
  app.useLogger(app.get(Logger));

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global filters
  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost).httpAdapter, app.get(Logger)),
  );

  // Swagger
  if (configService.get<boolean>('swagger.enable', true)) {
    await configureSwagger(app, basePath);
  }

  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port ${port}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`Base path: ${basePath || '/'}`);
  console.log(`Swagger enabled: ${configService.get<boolean>('swagger.enable', true)}`);
}
bootstrap();
