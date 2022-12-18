import { Module } from '@nestjs/common';
import { RawService } from './services/raw.service';
import { RawController } from './raw.controller';
import { RawRepository } from './raw.repository';
import { DatabaseService } from '../database/database.service';
import { RawCreateService } from './services/raw.create.service';
import { RawUpdateService } from './services/raw.update.service';
import { RawFindService } from './services/raw.find.service';
import { RawRemoveService } from './services/raw.remove.service';
import { RawConnectionService } from './services/raw.connection.service';

@Module({
    controllers: [RawController],
    providers: [
        DatabaseService,
        RawService,
        RawRepository,
        RawCreateService,
        RawUpdateService,
        RawFindService,
        RawRemoveService,
        RawConnectionService,
    ],
})
export class RawModule {}
