import { TTokenDecoded } from '@jerky/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtValidatorService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    public async validateAccessToken(token: string): Promise<TTokenDecoded> {
        return await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET_ACCESS'),
        });
    }

    public async validateRefreshToken(token: string): Promise<TTokenDecoded> {
        return await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
        });
    }

    public decodeToken(token: string): TTokenDecoded | null {
        return <TTokenDecoded>this.jwtService.decode(token);
    }
}
