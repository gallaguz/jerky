import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AuthModule } from './app/auth.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AuthModule);
    await app.init();
    const logger = new Logger(bootstrap.name);
    logger.verbose(`[AUTH] Microservice successfully started`);
}

void bootstrap();
