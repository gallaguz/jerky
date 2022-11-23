import { ConfigModuleOptions } from '@nestjs/config';

export const ENVConfig = (): ConfigModuleOptions => {
    return {
        isGlobal: true,
        envFilePath: ['envs/catalog.env', 'envs/.amqp.env'],
    };
};
