import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client/scripts/user-client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JwtStrategy') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:
                configService.get<string>('JWT_SECRET_ACCESS') ??
                'access_secret',
            ignoreExpiration: false,
        });
    }

    async validate({
        uuid,
        role,
    }: Pick<User, 'uuid' | 'role'>): Promise<Pick<User, 'uuid' | 'role'>> {
        return { uuid, role };
    }
}
