import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/scripts/auth-client';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
    public async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    public async enableShutdownHooks(app: INestApplication): Promise<void> {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
