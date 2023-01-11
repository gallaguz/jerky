import { Module } from '@nestjs/common';

import { DatabaseErrorHandlerService } from './database.error.handler.service';
import { DatabaseService } from './database.service';

@Module({
    providers: [DatabaseService, DatabaseErrorHandlerService],
    exports: [DatabaseService, DatabaseErrorHandlerService],
})
export class DatabaseModule {}
