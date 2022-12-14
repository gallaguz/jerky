import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const RMQConfig = (): IRMQServiceAsyncOptions => ({
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
        connections: [
            {
                login: configService.get('AMQP_USER') ?? '',
                password: configService.get('AMQP_PASSWORD') ?? '',
                host: configService.get('AMQP_HOSTNAME') ?? '',
            },
        ],
        prefetchCount: 42,
        serviceName: 'api',
        logMessages: configService.get('AMQP_LOG_MASSAGE') === 'true',
    }),
});
