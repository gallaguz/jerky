import { ContractsValidationService } from '@jerky/common';
import {
    InternalUserCreateCommandContract,
    InternalUserFindManyQueryContract,
    InternalUserFindOneQueryContract,
    InternalUserHealthCheckQueryContract,
    InternalUserRemoveCommandContract,
    InternalUserUpdateCommandContract,
} from '@jerky/contracts';
import { IController } from '@jerky/interfaces';
import { Controller } from '@nestjs/common';
import { User } from '@prisma/client/scripts/user-client';
import { RMQRoute } from 'nestjs-rmq';

import { UserService } from './user-service';

@Controller()
export class UserController implements IController<User> {
    constructor(
        private readonly userService: UserService,
        private readonly validationService: ContractsValidationService,
    ) {}

    @RMQRoute(InternalUserCreateCommandContract.topic)
    public async create(
        props: InternalUserCreateCommandContract.Request,
    ): Promise<InternalUserCreateCommandContract.Response> {
        const validated: InternalUserCreateCommandContract.Request =
            await this.validationService.validateContract(
                InternalUserCreateCommandContract.Request,
                props,
            );
        return await this.userService.create(validated);
    }
    @RMQRoute(InternalUserRemoveCommandContract.topic)
    public async remove(
        props: InternalUserRemoveCommandContract.Request,
    ): Promise<InternalUserRemoveCommandContract.Response> {
        const validated: InternalUserRemoveCommandContract.Request =
            await this.validationService.validateContract(
                InternalUserRemoveCommandContract.Request,
                props,
            );
        return this.userService.remove(validated);
    }
    @RMQRoute(InternalUserUpdateCommandContract.topic)
    public async update(
        props: InternalUserUpdateCommandContract.Request,
    ): Promise<InternalUserUpdateCommandContract.Response> {
        const validated: InternalUserUpdateCommandContract.Request =
            await this.validationService.validateContract(
                InternalUserUpdateCommandContract.Request,
                props,
            );
        return this.userService.update(validated);
    }
    @RMQRoute(InternalUserFindOneQueryContract.topic)
    public async findOne(
        props: InternalUserFindOneQueryContract.Request,
    ): Promise<InternalUserFindOneQueryContract.Response> {
        const validated: InternalUserFindOneQueryContract.Request =
            await this.validationService.validateContract(
                InternalUserFindOneQueryContract.Request,
                props,
            );
        return this.userService.findOne(validated);
    }
    @RMQRoute(InternalUserFindManyQueryContract.topic)
    public async findMany(
        props: InternalUserFindManyQueryContract.Request,
    ): Promise<InternalUserFindManyQueryContract.Response> {
        const validated: InternalUserFindManyQueryContract.Request =
            await this.validationService.validateContract(
                InternalUserFindManyQueryContract.Request,
                props,
                { ignoreEmpty: true },
            );
        return this.userService.findMany(validated);
    }
    @RMQRoute(InternalUserHealthCheckQueryContract.topic)
    public async healthCheck(): Promise<InternalUserHealthCheckQueryContract.Response> {
        return { pong: await this.userService.healthCheck() };
    }
}
