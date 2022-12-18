import {
    Injectable,
    OnModuleInit,
    INestApplication,
    Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client/scripts/catalog-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor(private readonly configService: ConfigService) {
        super(
            Number(configService.get('LOG_DB')) === 1
                ? {
                      errorFormat: 'pretty',
                      log: ['query', 'info', 'warn', 'error'],
                  }
                : {},
        );
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect().then(() => {
            Logger.log('[PRODUCT] Microservice successfully connected to DB!');
        });
    }

    public async enableShutdownHooks(app: INestApplication): Promise<void> {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
