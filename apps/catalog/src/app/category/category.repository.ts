import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { BaseRepository, IBaseRepository } from '../common';
import { Category, Prisma } from '@prisma/client/scripts/catalog-client';
import CategoryCreateInput = Prisma.CategoryCreateInput;
import CategoryUpdateInput = Prisma.CategoryUpdateInput;
import CategoryWhereUniqueInput = Prisma.CategoryWhereUniqueInput;
import CategoryFindManyArgs = Prisma.CategoryFindManyArgs;
import {
    ICategoryFindOneTitle,
    ICategoryFindOneUuid,
    ICategoryRemove,
} from '@jerky/interfaces';

@Injectable()
export class CategoryRepository
    extends BaseRepository
    implements
        IBaseRepository<
            Category,
            CategoryCreateInput,
            CategoryUpdateInput,
            CategoryFindManyArgs,
            ICategoryFindOneUuid,
            ICategoryFindOneTitle,
            ICategoryRemove
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        protected readonly configService: ConfigService,
    ) {
        super();
    }

    public async create(props: CategoryCreateInput): Promise<Category> {
        return await this.databaseService.category
            .create({
                data: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findFiltered(
        props: CategoryFindManyArgs,
    ): Promise<Category[]> {
        return await this.databaseService.category
            .findMany(props)
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneUuid(
        props: ICategoryFindOneUuid,
    ): Promise<Category | null> {
        return await this.databaseService.category
            .findUnique({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneTitle(
        props: ICategoryFindOneTitle,
    ): Promise<Category | null> {
        return await this.databaseService.category
            .findUnique({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async update(
        uuid: string,
        props: CategoryUpdateInput,
    ): Promise<Category> {
        return await this.databaseService.category
            .update({
                where: {
                    uuid,
                },
                data: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async remove(props: ICategoryRemove): Promise<Category> {
        return await this.databaseService.category
            .delete({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }
}
