import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModuleAsyncOptions, WinstonModuleOptions } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import * as winston from 'winston';

const { combine, timestamp, printf, colorize, align, json } = winston.format;

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    verbose: 4,
};
const errorFilter = winston.format((info) => {
    return info.level === 'error' ? info : false;
});

const warnFilter = winston.format((info) => {
    return info.level === 'warn' ? info : false;
});

const infoFilter = winston.format((info) => {
    return info.level === 'info' ? info : false;
});

const debugFilter = winston.format((info) => {
    return info.level === 'debug' ? info : false;
});

const verboseFilter = winston.format((info) => {
    return info.level === 'verbose' ? info : false;
});

export const WinstonConfig = (
    serviceName: string,
): WinstonModuleAsyncOptions => ({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): WinstonModuleOptions => ({
        defaultMeta: {
            service: serviceName,
        },
        levels: logLevels,
        level: configService.get('LOG_LEVEL') || 'error',
        format: combine(timestamp(), json()),
        transports: [
            new winston.transports.File({
                filename: `${process.cwd()}/log/${configService.get(
                    'LOG_PATH',
                )}${serviceName}-combined.log`,
            }),
            new winston.transports.File({
                level: 'error',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}${serviceName}-error.log`,
                format: combine(errorFilter(), timestamp(), json()),
            }),
            new winston.transports.File({
                level: 'warn',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}${serviceName}-warn.log`,
                format: combine(warnFilter(), timestamp(), json()),
            }),
            new winston.transports.File({
                level: 'info',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}${serviceName}-info.log`,
                format: combine(infoFilter(), timestamp(), json()),
            }),
            new winston.transports.File({
                level: 'debug',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}${serviceName}-debug.log`,
                format: combine(debugFilter(), timestamp(), json()),
            }),
            new winston.transports.File({
                level: 'verbose',
                filename: `${process.cwd()}/${configService.get(
                    'LOG_PATH',
                )}${serviceName}-verbose.log`,
                format: combine(verboseFilter(), timestamp(), json()),
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
