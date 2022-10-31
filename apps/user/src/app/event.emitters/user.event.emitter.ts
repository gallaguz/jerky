import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { IUserEntity } from '@jerky/interfaces';

@Injectable()
export class UserEventEmitter {
    constructor(private readonly rmqService: RMQService) {}

    async handle(user: IUserEntity): Promise<void> {
        for (const event of user.events) {
            await this.rmqService.notify(event.topic, event.data);
        }
    }
}
