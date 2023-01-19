import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AuthApp } from './app/auth-app';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AuthApp);
    await app.init();

    const logger = new Logger(bootstrap.name);
    logger.verbose(`[ AUTHORIZATION ] Microservice successfully started`);
}

void bootstrap();
