import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client/scripts/user-client';
import { RMQService } from 'nestjs-rmq';

import { UserEntity } from './user-entity';

@Injectable()
export class UserEventService {
    constructor(private readonly rmqService: RMQService) {}

    public async emitCreateEventBase(
        entity: UserEntity,
        created: User,
        props: unknown,
    ): Promise<void> {
        entity.createEvent(created, props);
        await this.handleEvent(entity);
    }
    public async emitUpdateEventBase(
        entity: UserEntity,
        existed: User,
        updated: User,
        props: unknown,
    ): Promise<void> {
        entity.updateEvent(existed, updated, props);
        await this.handleEvent(entity);
    }
    public async emitRemoveEventBase(
        entity: UserEntity,
        removed: User,
        props: unknown,
    ): Promise<void> {
        entity.removeEvent(removed, props);
        await this.handleEvent(entity);
    }
    public async handleEvent(entity: UserEntity): Promise<void> {
        for (const event of entity.events) {
            await this.rmqService.notify(event.topic, event.data);
        }
    }
}
