import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CatalogApp } from './app/catalog-app';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(CatalogApp);
    await app.init();

    const logger = new Logger(bootstrap.name);
    logger.verbose(`[ CATALOG ] Microservice successfully started`);
}

void bootstrap();
