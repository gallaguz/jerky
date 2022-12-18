import { RMQService } from 'nestjs-rmq';
import { BaseEntity } from './base.entity';
import * as crypto from 'crypto';

export abstract class BaseService {
    protected constructor(private readonly rmqService: RMQService) {}

    protected async handle(entity: BaseEntity): Promise<void> {
        for (const event of entity.events) {
            await this.rmqService.notify(event.topic, event.data);
        }
    }

    protected uuid = (): string => {
        return crypto.randomUUID();
    };
}
