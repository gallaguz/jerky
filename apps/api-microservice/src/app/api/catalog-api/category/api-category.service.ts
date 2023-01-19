import { ERROR_MESSAGES } from '@jerky/constants';
import {
    HttpCategoryCreate,
    HttpCategoryFindFiltered,
    HttpCategoryUpdate,
    InternalCategoryCreateCommandContract,
    InternalCategoryFindManyQueryContract,
    InternalCategoryFindOneQueryContract,
    InternalCategoryRemoveCommandContract,
    InternalCategoryUpdateCommandContract,
} from '@jerky/contracts';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import * as crypto from 'crypto';

@Injectable()
export class ApiCategoryService {
    constructor(private readonly rmqService: RMQService) {}

    public async create(
        dto: HttpCategoryCreate.Request,
    ): Promise<InternalCategoryCreateCommandContract.Response> {
        try {
            return await this.rmqService.send<
                InternalCategoryCreateCommandContract.Request,
                InternalCategoryCreateCommandContract.Response
            >(InternalCategoryCreateCommandContract.topic, dto, {
                headers: {
                    requestId: crypto.randomUUID(),
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async findMany(
        dto: HttpCategoryFindFiltered.Request,
    ): Promise<InternalCategoryFindManyQueryContract.Response> {
        try {
            return await this.rmqService.send<
                InternalCategoryFindManyQueryContract.Request,
                InternalCategoryFindManyQueryContract.Response
            >(InternalCategoryFindManyQueryContract.topic, dto, {
                headers: {
                    requestId: crypto.randomUUID(),
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async findOne(
        dto: InternalCategoryFindOneQueryContract.Request,
    ): Promise<InternalCategoryFindOneQueryContract.Response> {
        try {
            return await this.rmqService.send<
                InternalCategoryFindOneQueryContract.Request,
                InternalCategoryFindOneQueryContract.Response
            >(InternalCategoryFindOneQueryContract.topic, dto, {
                headers: {
                    requestId: crypto.randomUUID(),
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async update(
        dto: HttpCategoryUpdate.Request,
    ): Promise<InternalCategoryUpdateCommandContract.Response> {
        try {
            return await this.rmqService.send<
                InternalCategoryUpdateCommandContract.Request,
                InternalCategoryUpdateCommandContract.Response
            >(InternalCategoryUpdateCommandContract.topic, dto, {
                headers: {
                    requestId: crypto.randomUUID(),
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async remove(
        dto: InternalCategoryRemoveCommandContract.Request,
    ): Promise<InternalCategoryRemoveCommandContract.Response> {
        try {
            return await this.rmqService.send<
                InternalCategoryRemoveCommandContract.Request,
                InternalCategoryRemoveCommandContract.Response
            >(InternalCategoryRemoveCommandContract.topic, dto, {
                headers: {
                    requestId: crypto.randomUUID(),
                },
            });
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }
}
