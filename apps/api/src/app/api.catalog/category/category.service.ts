import { BadRequestException, Injectable } from '@nestjs/common';
import {
    CategoryCreateCommandContract,
    CategoryRemoveCommandContract,
    CategoryFindFilteredQueryContract,
    CategoryFindOneUuidQueryContract,
    CategoryUpdateCommandContract,
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
    ): Promise<CategoryCreateCommandContract.Response> {
        try {
            return await this.rmqService.send<
                CategoryCreateCommandContract.Request,
                CategoryCreateCommandContract.Response
            >(
                CategoryCreateCommandContract.topic,
                <CategoryCreateCommandContract.Request>dto,
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

    public async findFiltered(
        dto: HttpCategoryFindFiltered.Request,
    ): Promise<CategoryFindFilteredQueryContract.Response> {
        try {
            return await this.rmqService.send<
                CategoryFindFilteredQueryContract.Request,
                CategoryFindFilteredQueryContract.Response
            >(
                CategoryFindFilteredQueryContract.topic,
                <CategoryFindFilteredQueryContract.Request>dto,
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
        dto: CategoryFindOneUuidQueryContract.Request,
    ): Promise<CategoryFindOneUuidQueryContract.Response> {
        try {
            return await this.rmqService.send<
                CategoryFindOneUuidQueryContract.Request,
                CategoryFindOneUuidQueryContract.Response
            >(
                CategoryFindOneUuidQueryContract.topic,
                <CategoryFindOneUuidQueryContract.Request>dto,
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

    public async update(
        dto: HttpCategoryUpdate.Request,
    ): Promise<CategoryUpdateCommandContract.Response> {
        try {
            return await this.rmqService.send<
                CategoryUpdateCommandContract.Request,
                CategoryUpdateCommandContract.Response
            >(
                CategoryUpdateCommandContract.topic,
                <CategoryUpdateCommandContract.Request>dto,
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

    public async remove(
        dto: CategoryRemoveCommandContract.Request,
    ): Promise<CategoryRemoveCommandContract.Response> {
        try {
            return await this.rmqService.send<
                CategoryRemoveCommandContract.Request,
                CategoryRemoveCommandContract.Response
            >(
                CategoryRemoveCommandContract.topic,
                <CategoryRemoveCommandContract.Request>dto,
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
}
