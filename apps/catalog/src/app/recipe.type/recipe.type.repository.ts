import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { Prisma, RecipeType } from '@prisma/client/scripts/catalog-client';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { BaseRepository, IBaseRepository } from '../common';
import RecipeTypeCreateInput = Prisma.RecipeTypeCreateInput;
import RecipeTypeUpdateInput = Prisma.RecipeTypeUpdateInput;
import RecipeTypeFindManyArgs = Prisma.RecipeTypeFindManyArgs;
import RecipeTypeWhereUniqueInput = Prisma.RecipeTypeWhereUniqueInput;

@Injectable()
export class RecipeTypeRepository
    extends BaseRepository
    implements
        IBaseRepository<
            RecipeType,
            RecipeTypeCreateInput,
            RecipeTypeUpdateInput,
            RecipeTypeFindManyArgs,
            RecipeTypeWhereUniqueInput,
            RecipeTypeWhereUniqueInput,
            RecipeTypeWhereUniqueInput
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        protected readonly configService: ConfigService,
    ) {
        super();
    }

    public async create(props: RecipeTypeCreateInput): Promise<RecipeType> {
        return await this.databaseService.recipeType
            .create({
                data: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findFiltered(
        props: RecipeTypeFindManyArgs,
    ): Promise<RecipeType[]> {
        return await this.databaseService.recipeType
            .findMany(props)
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneUuid(
        props: RecipeTypeWhereUniqueInput,
    ): Promise<RecipeType | null> {
        return await this.databaseService.recipeType
            .findUnique({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneTitle(
        props: RecipeTypeWhereUniqueInput,
    ): Promise<RecipeType | null> {
        return await this.databaseService.recipeType
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
        props: RecipeTypeUpdateInput,
    ): Promise<RecipeType> {
        return await this.databaseService.recipeType
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

    public async remove(
        props: RecipeTypeWhereUniqueInput,
    ): Promise<RecipeType> {
        return await this.databaseService.recipeType
            .delete({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }
}
