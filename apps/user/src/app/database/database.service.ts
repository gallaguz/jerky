import {
    Injectable,
    OnModuleInit,
    INestApplication,
    Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client/scripts/user-client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    public async onModuleInit(): Promise<void> {
        await this.$connect().then(() => {
            Logger.log('[USER] Microservice successfully connected to DB!');
        });
    }

    public async enableShutdownHooks(app: INestApplication): Promise<void> {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
