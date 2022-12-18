import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CatalogModule } from './app/catalog.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(CatalogModule);
    await app.init();
    const logger = new Logger(bootstrap.name);
    logger.verbose(`[Catalog] Microservice successfully started`);
}

void bootstrap();
