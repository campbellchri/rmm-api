// swagger.ts
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

export async function configureSwagger(
    app: INestApplication,
    basePath?: string,
): Promise<void> {
    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle(configService.get<string>('swagger.title', 'API Docs'))
        .setDescription(configService.get<string>('swagger.description', 'API documentation'))
        .setVersion(configService.get<string>('swagger.version', '1.0'))
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // Don't write to filesystem in containerized environments
    if (process.env.NODE_ENV === 'development' && !process.env.CONTAINERIZED) {
        fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
    }

    SwaggerModule.setup(`${basePath ? `${basePath}/` : ''}api`, app, document);
}
