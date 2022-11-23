import { RMQService } from 'nestjs-rmq';
import { BaseEntity } from './base.entity';

export interface IBaseService<T> {
    create: (props: any) => Promise<T>;
    findFiltered: (props: any) => Promise<T[]>;
    findOne: (props: any) => Promise<T>;
    update: (props: any) => Promise<T>;
    remove: (props: any) => Promise<T>;
}

export abstract class BaseService {
    protected constructor(private readonly rmqService: RMQService) {}

    public async handle(entity: BaseEntity): Promise<void> {
        for (const event of entity.events) {
            await this.rmqService.notify(event.topic, event.data);
        }
    }
}
