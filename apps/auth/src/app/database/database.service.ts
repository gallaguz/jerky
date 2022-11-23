import {
    Injectable,
    OnModuleInit,
    INestApplication,
    Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client/scripts/auth-client';

const logger = new Logger();

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    public async onModuleInit(): Promise<void> {
        await this.$connect().then(() => {
            logger.debug(`${DatabaseService.name} connected`);
        });
    }

    public async enableShutdownHooks(app: INestApplication): Promise<void> {
        this.$on('beforeExit', async () => {
            await app.close().then(() => {
                logger.debug(`${DatabaseService.name} disconnected`);
            });
        });
    }
}
