import { BadRequestException, Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UUUIDService } from '../../common/uuid.service';
import {
    HttpIngredientCreate,
    HttpIngredientFindFiltered,
    IngredientCreate,
    IngredientFindFiltered,
    IngredientFindOne,
    IngredientRemove,
    IngredientUpdate,
} from '@jerky/contracts';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;

@Injectable()
export class IngredientService {
    constructor(
        private readonly rmqService: RMQService,
        private readonly uuidService: UUUIDService,
    ) {}

    public async create(
        dto: HttpIngredientCreate.Request,
    ): Promise<HttpIngredientCreate.Response> {
        try {
            return await this.rmqService.send<
                IngredientCreate.Request,
                IngredientCreate.Response
            >(IngredientCreate.topic, <IngredientCreate.Request>dto, {
                headers: {
                    requestId: this.uuidService.getUuid(),
                },
            });
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
                IngredientFindFiltered.Request,
                IngredientFindFiltered.Response
            >(
                IngredientFindFiltered.topic,
                <IngredientFindFiltered.Request>dto,
                {
                    headers: {
                        requestId: this.uuidService.getUuid(),
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
        dto: IngredientFindOne.Request,
    ): Promise<IngredientFindOne.Response> {
        try {
            return await this.rmqService.send<
                IngredientFindOne.Request,
                IngredientFindOne.Response
            >(IngredientFindOne.topic, <IngredientFindOne.Request>dto, {
                headers: {
                    requestId: this.uuidService.getUuid(),
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
        dto: IngredientUpdate.Request,
    ): Promise<IngredientUpdate.Response> {
        try {
            return await this.rmqService.send<
                IngredientUpdate.Request,
                IngredientUpdate.Response
            >(IngredientUpdate.topic, <IngredientUpdate.Request>dto, {
                headers: {
                    requestId: this.uuidService.getUuid(),
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
        dto: IngredientRemove.Request,
    ): Promise<IngredientRemove.Response> {
        try {
            return await this.rmqService.send<
                IngredientRemove.Request,
                IngredientRemove.Response
            >(IngredientRemove.topic, <IngredientRemove.Request>dto, {
                headers: {
                    requestId: this.uuidService.getUuid(),
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
