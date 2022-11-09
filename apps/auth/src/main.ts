import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AuthModule } from './app/auth.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AuthModule);

    await app.init();
    Logger.log(`[AUTH] Microservice successfully started`);
}

void bootstrap();
