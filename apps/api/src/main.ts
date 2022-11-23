import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApiModule } from './app/api.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(ApiModule);
    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);
    app.use(cookieParser());
    const port = process.env.PORT || 3333;
    await app.listen(port);
    const logger = new Logger(bootstrap.name);
    logger.verbose(
        `[API] Microservice is running on: http://localhost:${port}/${globalPrefix}`,
    );
}

void bootstrap();
