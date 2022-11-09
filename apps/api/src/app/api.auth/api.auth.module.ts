import { Logger, Module } from '@nestjs/common';
import { JwtStrategy } from '../system/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ApiAuthCommandController } from './commands/api.auth.command.controller';
import { ApiAuthQueriesController } from './queries/api.auth.queries.controller';
import { ApiUserModule } from '../api.user/api.user.module';
import { ApiAuthCommandsService } from './commands/api.auth.commands.service';
import { ApiAuthQueriesService } from './queries/api.auth.queries.service';
import { JWTConfig } from '../../configs';
import { UUUIDService } from '../common/uuid.service';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync(JWTConfig()),
        ApiUserModule,
    ],
    controllers: [ApiAuthCommandController, ApiAuthQueriesController],
    providers: [
        UUUIDService,
        JwtStrategy,
        ApiAuthCommandsService,
        ApiAuthQueriesService,
        Logger,
    ],
})
export class ApiAuthModule {}
