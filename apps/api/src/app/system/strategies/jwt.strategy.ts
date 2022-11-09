import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IUser } from '@jerky/interfaces';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JwtStrategy') {
    constructor(private readonly configService: ConfigService) {
        super(<StrategyOptions>{
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_ACCESS'),
        });
    }

    async validate({
        uuid,
        role,
    }: Pick<IUser, 'uuid' | 'role'>): Promise<Pick<IUser, 'uuid' | 'role'>> {
        return { uuid, role };
    }
}
