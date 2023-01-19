import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JwtConfig = (): JwtModuleAsyncOptions => ({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_ACCESS') ?? '',
    }),
});

// const getSecret = (configService: ConfigService): string => {
//     console.log(configService.get<string>('JWT_SECRET_ACCESS'));
//     return configService.get<string>('JWT_SECRET_ACCESS');
// };
