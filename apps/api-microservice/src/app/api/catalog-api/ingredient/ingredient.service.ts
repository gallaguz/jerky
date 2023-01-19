import { ERROR_MESSAGES } from '@jerky/constants';
import {
    HttpIngredientCreate,
    HttpIngredientFindFiltered,
    InternalIngredientCreateCommandContract,
    InternalIngredientFindManyQueryContract,
    InternalIngredientFindOneQueryContract,
    InternalIngredientRemoveCommandContract,
    InternalIngredientUpdateCommandContract,
} from '@jerky/contracts';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import * as crypto from 'crypto';

@Injectable()
export class IngredientService {
    constructor(private readonly rmqService: RMQService) {}

    public async create(
        dto: HttpIngredientCreate.Request,
    ): Promise<HttpIngredientCreate.Response> {
        try {
            return await this.rmqService.send<
                InternalIngredientCreateCommandContract.Request,
                InternalIngredientCreateCommandContract.Response
            >(
                InternalIngredientCreateCommandContract.topic,
                <InternalIngredientCreateCommandContract.Request>dto,
                {
                    headers: {
                        requestId: crypto.randomUUID(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async findFiltered(
        dto: HttpIngredientFindFiltered.Request,
    ): Promise<HttpIngredientFindFiltered.Response> {
        try {
            return await this.rmqService.send<
                InternalIngredientFindManyQueryContract.Request,
                InternalIngredientFindManyQueryContract.Response
            >(
                InternalIngredientFindManyQueryContract.topic,
                <InternalIngredientFindManyQueryContract.Request>dto,
                {
                    headers: {
                        requestId: crypto.randomUUID(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async findOne(
        dto: InternalIngredientFindOneQueryContract.Request,
    ): Promise<InternalIngredientFindOneQueryContract.Response> {
        try {
            return await this.rmqService.send<
                InternalIngredientFindOneQueryContract.Request,
                InternalIngredientFindOneQueryContract.Response
            >(
                InternalIngredientFindOneQueryContract.topic,
                <InternalIngredientFindOneQueryContract.Request>dto,
                {
                    headers: {
                        requestId: crypto.randomUUID(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async update(
        dto: InternalIngredientUpdateCommandContract.Request,
    ): Promise<InternalIngredientUpdateCommandContract.Response> {
        try {
            return await this.rmqService.send<
                InternalIngredientUpdateCommandContract.Request,
                InternalIngredientUpdateCommandContract.Response
            >(
                InternalIngredientUpdateCommandContract.topic,
                <InternalIngredientUpdateCommandContract.Request>dto,
                {
                    headers: {
                        requestId: crypto.randomUUID(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }

    public async remove(
        dto: InternalIngredientRemoveCommandContract.Request,
    ): Promise<InternalIngredientRemoveCommandContract.Response> {
        try {
            return await this.rmqService.send<
                InternalIngredientRemoveCommandContract.Request,
                InternalIngredientRemoveCommandContract.Response
            >(
                InternalIngredientRemoveCommandContract.topic,
                <InternalIngredientRemoveCommandContract.Request>dto,
                {
                    headers: {
                        requestId: crypto.randomUUID(),
                    },
                },
            );
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message);
            }
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
    }
}
