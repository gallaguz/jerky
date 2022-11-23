import { BadRequestException, Injectable } from '@nestjs/common';
import {
    CategoryCreate,
    CategoryRemove,
    CategoryFindFiltered,
    CategoryFindOne,
    CategoryUpdate,
    HttpCategoryCreate,
    HttpCategoryFindFiltered,
    HttpCategoryUpdate,
} from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';
import { UUUIDService } from '../../common/uuid.service';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;

@Injectable()
export class CategoryService {
    constructor(
        private readonly rmqService: RMQService,
        private readonly uuidService: UUUIDService,
    ) {}

    public async create(
        dto: HttpCategoryCreate.Request,
    ): Promise<CategoryCreate.Response> {
        try {
            return await this.rmqService.send<
                CategoryCreate.Request,
                CategoryCreate.Response
            >(CategoryCreate.topic, <CategoryCreate.Request>dto, {
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
        dto: HttpCategoryFindFiltered.Request,
    ): Promise<CategoryFindFiltered.Response> {
        try {
            return await this.rmqService.send<
                CategoryFindFiltered.Request,
                CategoryFindFiltered.Response
            >(CategoryFindFiltered.topic, <CategoryFindFiltered.Request>dto, {
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

    public async findOne(
        dto: CategoryFindOne.Request,
    ): Promise<CategoryFindOne.Response> {
        try {
            return await this.rmqService.send<
                CategoryFindOne.Request,
                CategoryFindOne.Response
            >(CategoryFindOne.topic, <CategoryFindOne.Request>dto, {
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
        dto: HttpCategoryUpdate.Request,
    ): Promise<CategoryUpdate.Response> {
        try {
            return await this.rmqService.send<
                CategoryUpdate.Request,
                CategoryUpdate.Response
            >(CategoryUpdate.topic, <CategoryUpdate.Request>dto, {
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
        dto: CategoryRemove.Request,
    ): Promise<CategoryRemove.Response> {
        try {
            return await this.rmqService.send<
                CategoryRemove.Request,
                CategoryRemove.Response
            >(CategoryRemove.topic, <CategoryRemove.Request>dto, {
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
