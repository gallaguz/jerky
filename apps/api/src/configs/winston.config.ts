import { ConfigModule, ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import { ApiAuthModule } from '../app/api.auth/api.auth.module';
import { WinstonModuleAsyncOptions, WinstonModuleOptions } from 'nest-winston';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { combine, timestamp, printf, colorize, align, json } = winston.format;

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    verbose: 4,
};

export const WinstonConfig = (): WinstonModuleAsyncOptions => ({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): WinstonModuleOptions => ({
        defaultMeta: {
            service: ApiAuthModule.name,
        },
        levels: logLevels,
        level: configService.get('LOG_LEVEL') || 'info',
        format: combine(timestamp(), json()),
        transports: [
            new winston.transports.File({
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}combined.log`,
            }),
            new winston.transports.File({
                level: 'error',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}error.log`,
            }),
            new winston.transports.File({
                level: 'warn',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}warn.log`,
            }),
            new winston.transports.File({
                // format: combine(
                //     colorize({ all: true }),
                //     timestamp({
                //         format: 'YYYY-MM-DD hh:mm:ss.SSS A',
                //     }),
                //     align(),
                //     printf(
                //         (info) =>
                //             `[${info.timestamp}] ${info.level}: ${info.message}`,
                //     ),
                // ),
                level: 'info',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}info.log`,
            }),
            new winston.transports.File({
                level: 'debug',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}debug.log`,
            }),
            new winston.transports.File({
                level: 'verbose',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}verbose.log`,
            }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    nestWinstonModuleUtilities.format.nestLike(),
                ),
            }),
        ],
    }),
});
