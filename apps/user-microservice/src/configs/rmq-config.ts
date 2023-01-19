import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const RmqConfig = (): IRMQServiceAsyncOptions => ({
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        exchangeName: configService.get<string>('AMQP_EXCHANGE') ?? '',
        connections: [
            {
                login: configService.get<string>('AMQP_USER') ?? '',
                password: configService.get<string>('AMQP_PASSWORD') ?? '',
                host: configService.get<string>('AMQP_HOSTNAME') ?? '',
            },
        ],
        prefetchCount: 42,
        serviceName: 'user-microservice',
        logMessages: configService.get<string>('AMQP_LOG_MASSAGE') === 'true',
        queueName: configService.get<string>('AMQP_QUEUE') ?? '',
    }),
});
