import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ProductModule } from './app/product.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(ProductModule);
    await app.init();
    const logger = new Logger(bootstrap.name);
    logger.verbose(`[PRODUCT] Microservice successfully started`);
}

void bootstrap();
