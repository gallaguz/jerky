import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { UserApp } from './app/user-app';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(UserApp);
    await app.init();

    const logger = new Logger(bootstrap.name);
    logger.verbose(`[ USER ] Microservice successfully started!`);
}

void bootstrap();
