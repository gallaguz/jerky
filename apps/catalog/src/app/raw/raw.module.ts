import { Module } from '@nestjs/common';
import { RawService } from './raw.service';
import { RawController } from './raw.controller';
import { RawRepository } from './raw.repository';
import { DatabaseService } from '../database/database.service';

@Module({
    controllers: [RawController],
    providers: [DatabaseService, RawService, RawRepository],
})
export class RawModule {}
