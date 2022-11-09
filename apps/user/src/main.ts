import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    await app.init();

    Logger.log(`[USER] Microservice successfully started!`);
}

void bootstrap();
