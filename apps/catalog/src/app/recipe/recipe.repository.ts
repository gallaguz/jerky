import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { Prisma, Recipe } from '@prisma/client/scripts/catalog-client';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { IBaseRepository, BaseRepository } from '../common';
import RecipeCreateInput = Prisma.RecipeCreateInput;
import RecipeUpdateInput = Prisma.RecipeUpdateInput;
import RecipeWhereInput = Prisma.RecipeWhereInput;
import RecipeWhereUniqueInput = Prisma.RecipeWhereUniqueInput;
import RecipeFindManyArgs = Prisma.RecipeFindManyArgs;

@Injectable()
export class RecipeRepository
    extends BaseRepository
    implements
        IBaseRepository<
            Recipe,
            RecipeCreateInput,
            RecipeUpdateInput,
            RecipeFindManyArgs,
            RecipeWhereUniqueInput,
            RecipeWhereInput,
            RecipeWhereUniqueInput
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        protected readonly configService: ConfigService,
    ) {
        super();
    }

    public async create(props: RecipeCreateInput): Promise<Recipe> {
        return await this.databaseService.recipe
            .create({ data: props })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findFiltered(props: RecipeFindManyArgs): Promise<Recipe[]> {
        return await this.databaseService.recipe
            .findMany(props)
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneUuid(
        props: RecipeWhereUniqueInput,
    ): Promise<Recipe | null> {
        return await this.databaseService.recipe
            .findUnique({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneTitle(props: RecipeWhereInput): Promise<Recipe | null> {
        return await this.databaseService.recipe
            .findFirst({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async update(
        uuid: string,
        props: RecipeUpdateInput,
    ): Promise<Recipe> {
        return await this.databaseService.recipe
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

    public async remove(props: RecipeWhereUniqueInput): Promise<Recipe> {
        return await this.databaseService.recipe
            .delete({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }
}
