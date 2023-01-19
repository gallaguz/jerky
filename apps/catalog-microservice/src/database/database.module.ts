import { Module } from '@nestjs/common';

import { CatalogDatabaseErrorHandlerService } from './catalog-database-error-handler.service';
import { DatabaseService } from './database.service';

@Module({
    providers: [DatabaseService, CatalogDatabaseErrorHandlerService],
    exports: [DatabaseService, CatalogDatabaseErrorHandlerService],
})
export class DatabaseModule {}
