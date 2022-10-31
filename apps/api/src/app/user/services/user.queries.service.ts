import { Injectable } from '@nestjs/common';
import { UserServiceBase } from '../common/user.service.base';
import { RMQService } from 'nestjs-rmq';
import {
    UserFindByEmail,
    UserFindByUuid,
    UserFindFiltered,
    UserHealthCheck,
} from '@jerky/contracts';

@Injectable()
export class UserQueriesService extends UserServiceBase {
    constructor(private readonly rmqService: RMQService) {
        super();
    }

    public async healthCheck(): Promise<UserHealthCheck.Response> {
        return await this.rmqService.send<
            UserHealthCheck.Request,
            UserHealthCheck.Response
        >(UserHealthCheck.topic, <UserHealthCheck.Request>{}, {
            headers: {
                requestId: this.generateUUID(),
            },
        });
    }

    // public async validate({
    //     email,
    //     password,
    // }: UserValidate.Request): Promise<UserValidate.Response> {
    //     // try {
    //     return await this.rmqService.send<
    //         UserValidate.Request,
    //         UserValidate.Response
    //     >(
    //         UserValidate.topic,
    //         { email, password },
    //         {
    //             headers: {
    //                 requestId: this.generateUUID(),
    //             },
    //         },
    //     );
    //
    //     // } catch (e) {
    //     //     console.log(e);
    //     //     if (e instanceof Error) {
    //     //         // throw new UnauthorizedException('Wrong credentials');
    //     //     }
    //     //     return false;
    //     // }
    // }

    public async findOneByUuid(
        dto: UserFindByUuid.Request,
    ): Promise<UserFindByUuid.Response> {
        return await this.rmqService.send<
            UserFindByUuid.Request,
            UserFindByUuid.Response
        >(UserFindByUuid.topic, dto, {
            headers: {
                requestId: this.generateUUID(),
            },
        });
    }

    public async findOneByEmail({
        email,
    }: UserFindByEmail.Request): Promise<UserFindByEmail.Response> {
        return await this.rmqService.send<
            UserFindByEmail.Request,
            UserFindByEmail.Response
        >(
            UserFindByEmail.topic,
            { email },
            {
                headers: {
                    requestId: this.generateUUID(),
                },
            },
        );
    }

    public async findManyFiltered(
        dto: UserFindFiltered.Request,
    ): Promise<UserFindFiltered.Response> {
        return await this.rmqService.send<
            UserFindFiltered.Request,
            UserFindFiltered.Response
        >(UserFindFiltered.topic, dto, {
            headers: {
                requestId: this.generateUUID(),
            },
        });
    }
}
