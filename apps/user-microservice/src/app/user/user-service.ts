import { ERROR_MESSAGES } from '@jerky/constants';
import {
    InternalUserCreateCommandContract,
    InternalUserFindManyQueryContract,
    InternalUserFindOneQueryContract,
    InternalUserRemoveCommandContract,
    InternalUserUpdateCommandContract,
} from '@jerky/contracts';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { UserEntity } from './user-entity';
import { UserRepository } from './user-repository';
import USER = ERROR_MESSAGES.USER;
import { IBaseService } from '@jerky/interfaces';
import { User } from '@prisma/client/scripts/user-client';
import { RMQService } from 'nestjs-rmq';

import { UserEventService } from './user-event-service';

@Injectable()
export class UserService
    implements
        IBaseService<
            User,
            InternalUserCreateCommandContract.Request,
            InternalUserUpdateCommandContract.Request,
            InternalUserRemoveCommandContract.Request,
            InternalUserFindManyQueryContract.Request,
            InternalUserFindOneQueryContract.Request
        >
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userEventService: UserEventService,
        private readonly rmqService: RMQService,
    ) {}

    public async create(
        props: InternalUserCreateCommandContract.Request,
    ): Promise<User> {
        const existed = await this.userRepository.findOne({
            where: { email: props.data.email },
        });
        if (existed) throw new ConflictException();

        const created: User = await this.userRepository.create({ ...props });
        if (!created) throw new BadRequestException();

        const entity: UserEntity = new UserEntity(props.data);
        await this.userEventService.emitCreateEventBase(entity, created, props);

        return created;
    }

    public async update(
        props: InternalUserUpdateCommandContract.Request,
    ): Promise<User> {
        const existed = await this.userRepository.findOne({
            where: { uuid: props.where.uuid },
        });
        if (!existed) throw new NotFoundException(USER.NOT_FOUND);

        const updated = await this.userRepository.update(props);
        if (!updated) throw new BadRequestException();

        const entity = await new UserEntity(existed).update(props.data);
        await this.userEventService.emitUpdateEventBase(
            entity,
            existed,
            updated,
            props,
        );
        return updated;
    }

    public async remove(
        props: InternalUserRemoveCommandContract.Request,
    ): Promise<User> {
        const removed = await this.userRepository.remove(props);
        if (!removed) throw new BadRequestException();

        const entity: UserEntity = new UserEntity(removed);
        await this.userEventService.emitRemoveEventBase(entity, removed, props);

        return removed;
    }

    public async healthCheck(): Promise<boolean> {
        return this.rmqService.healthCheck();
    }

    public async findOne(
        props: InternalUserFindOneQueryContract.Request,
    ): Promise<User> {
        const existed: User | null = await this.userRepository.findOne(props);
        if (!existed) throw new NotFoundException();
        return existed;
    }

    public async findMany(
        props: InternalUserFindManyQueryContract.Request,
    ): Promise<User[]> {
        return await this.userRepository.findMany(props);
    }
}
