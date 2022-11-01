import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AnyExceptionFilter } from './app/user/exeptions/any-exception.filter';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalFilters(new AnyExceptionFilter());
    const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(
        `[API] Microservice is running on: http://localhost:${port}/${globalPrefix}`,
    );
}

void bootstrap();
