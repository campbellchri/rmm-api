import { ConfigModule, ConfigModuleOptions, ConfigService } from "@nestjs/config";
import configuration from './config'
import { v4 as uuid } from 'uuid';
import { LoggerModuleAsyncParams } from "nestjs-pino";

export function configModuleOptionsGetter(): ConfigModuleOptions {
    return {
        isGlobal: true,
        ignoreEnvFile: true,
        load: [configuration],
    };
}

export function loggerModuleOptionsGetter(): LoggerModuleAsyncParams {
    return {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const level = configService.get('logLevel');

            return {
                pinoHttp: {
                    level,
                    redact: ['req.headers.authorization'],
                    messageKey: 'msg',
                    autoLogging: true,
                    quietReqLogger: true,
                    genReqId: () => uuid(),
                    formatters: {
                        level(label, number) {
                            return { level: label };
                        },
                    },
                },
            };
        },
    };
}