import { TEntityBase } from '@jerky/interfaces';
import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class EventService {
    constructor(private readonly rmqService: RMQService) {}

    public async emitCreateEventBase(
        entity: TEntityBase<unknown, unknown>,
        created: unknown,
        props: unknown,
    ): Promise<void> {
        entity.createEvent(created, props);
        await this.handleEvent(entity);
    }
    public async emitUpdateEventBase(
        entity: TEntityBase<unknown, unknown>,
        existed: unknown,
        updated: unknown,
        props: unknown,
    ): Promise<void> {
        entity.updateEvent(existed, updated, props);
        await this.handleEvent(entity);
    }
    public async emitRemoveEventBase(
        entity: TEntityBase<unknown, unknown>,
        removed: unknown,
        props: unknown,
    ): Promise<void> {
        entity.removeEvent(removed, props);
        await this.handleEvent(entity);
    }
    public async handleEvent(
        entity: TEntityBase<unknown, unknown>,
    ): Promise<void> {
        for (const event of entity.events) {
            await this.rmqService.notify(event.topic, event.data);
        }
    }
}
