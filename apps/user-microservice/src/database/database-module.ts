import { Module } from '@nestjs/common';

import { DatabaseService } from './database-service';
import { UserDatabaseErrorHandlerService } from './user-database-error-handler-service';

@Module({
    providers: [DatabaseService, UserDatabaseErrorHandlerService],
    exports: [DatabaseService, UserDatabaseErrorHandlerService],
})
export class DatabaseModule {}
