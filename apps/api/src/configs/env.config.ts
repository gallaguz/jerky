import { ConfigModuleOptions } from '@nestjs/config';

export const ENVConfig = (): ConfigModuleOptions => {
    return {
        isGlobal: true,
        envFilePath: ['envs/.jwt.env', 'envs/.amqp.env', 'envs/.cron.env'],
    };
};
