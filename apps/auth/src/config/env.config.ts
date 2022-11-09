import { ConfigModuleOptions } from '@nestjs/config';

export const ENVConfig = (): ConfigModuleOptions => {
    return {
        isGlobal: true,
        envFilePath: ['envs/.auth.env', 'envs/.jwt.env', 'envs/.amqp.env'],
    };
};
