import { JwtValidatorService, UUIDService } from '@jerky/common';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { ApiAuthController } from './api-auth-controller';
import { ApiAuthService } from './api-auth-service';

@Module({
    // imports: [PassportModule],
    controllers: [ApiAuthController],
    providers: [
        JwtStrategy,
        JwtService,
        JwtValidatorService,
        ApiAuthService,
        UUIDService,
    ],
})
export class ApiAuthModule {}
