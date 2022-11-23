import { Injectable, NotFoundException } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { ApiUserQueriesService } from '../../api.user/queries/api.user.queries.service';
import { IUser } from '@jerky/interfaces';
import { UUUIDService } from '../../common/uuid.service';
import { ERROR_MESSAGES } from '@jerky/constants';
import USER = ERROR_MESSAGES.USER;

@Injectable()
export class ApiAuthQueriesService {
    constructor(
        private readonly rmqService: RMQService,
        private readonly userQueriesService: ApiUserQueriesService,
        private readonly uuidService: UUUIDService,
    ) {}

    public async info(uuid: string): Promise<IUser> {
        const user = await this.userQueriesService.findOneByUuid({ uuid });
        if (!user) throw new NotFoundException(USER.NOT_FOUND);
        return user;
    }
}
