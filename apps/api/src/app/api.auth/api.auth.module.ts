import { Module } from '@nestjs/common';
import { JwtStrategy } from '../core/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ApiAuthCommandController } from './commands/api.auth.command.controller';
import { ApiAuthQueriesController } from './queries/api.auth.queries.controller';
import { ApiUserModule } from '../api.user/api.user.module';
import { ApiAuthCommandsService } from './commands/api.auth.commands.service';
import { ApiAuthQueriesService } from './queries/api.auth.queries.service';
import { UUUIDService } from '../common/uuid.service';

@Module({
    imports: [ConfigModule, PassportModule, ApiUserModule],
    controllers: [ApiAuthCommandController, ApiAuthQueriesController],
    providers: [
        UUUIDService,
        JwtStrategy,
        ApiAuthCommandsService,
        ApiAuthQueriesService,
    ],
})
export class ApiAuthModule {}
