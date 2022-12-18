import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { BaseRepository, IBaseRepository } from '../common';
import { Ingredient, Prisma } from '@prisma/client/scripts/catalog-client';
import IngredientCreateInput = Prisma.IngredientCreateInput;
import IngredientUpdateInput = Prisma.IngredientUpdateInput;
import IngredientFindManyArgs = Prisma.IngredientFindManyArgs;
import IngredientWhereUniqueInput = Prisma.IngredientWhereUniqueInput;
import IngredientWhereInput = Prisma.IngredientWhereInput;

@Injectable()
export class IngredientRepository
    extends BaseRepository
    implements
        IBaseRepository<
            Ingredient,
            IngredientCreateInput,
            IngredientUpdateInput,
            IngredientFindManyArgs,
            IngredientWhereUniqueInput,
            IngredientWhereInput,
            IngredientWhereUniqueInput
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        protected readonly configService: ConfigService,
    ) {
        super();
    }

    public async create(props: IngredientCreateInput): Promise<Ingredient> {
        return await this.databaseService.ingredient
            .create({ data: props })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findFiltered(
        props: IngredientFindManyArgs,
    ): Promise<Ingredient[]> {
        return await this.databaseService.ingredient
            .findMany(props)
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneUuid(
        props: IngredientWhereUniqueInput,
    ): Promise<Ingredient | null> {
        return await this.databaseService.ingredient
            .findUnique({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneTitle(
        props: IngredientWhereInput,
    ): Promise<Ingredient | null> {
        return await this.databaseService.ingredient
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
        props: IngredientUpdateInput,
    ): Promise<Ingredient> {
        return await this.databaseService.ingredient
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
        props: IngredientWhereUniqueInput,
    ): Promise<Ingredient> {
        return this.databaseService.ingredient
            .delete({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }
}
