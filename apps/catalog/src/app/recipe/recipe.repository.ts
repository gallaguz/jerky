import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { Recipe } from '@prisma/client/scripts/catalog-client';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { RepositoryHelper, IBaseRepository } from '../common/base.repository';
import { IRecipeEntity } from '@jerky/interfaces';
import { FindFiltered } from '@jerky/contracts';

@Injectable()
export class RecipeRepository
    extends RepositoryHelper
    implements IBaseRepository<Recipe>
{
    constructor(
        private readonly databaseService: DatabaseService,
        configService: ConfigService,
    ) {
        super(configService);
    }

    public async create({
        uuid,
        title,
        description,
        rawUuid,
        categoryUuid,
        recipeTypeUuid,
    }: IRecipeEntity): Promise<Recipe> {
        return await this.databaseService.recipe
            .create({
                data: {
                    uuid,
                    title,
                    description,
                    recipeTypeUuid,
                    categoryUuid,
                    rawUuid,
                },
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findFiltered({
        take,
        skip,
        orderBy,
        searchString,
    }: FindFiltered): Promise<Recipe[]> {
        return await this.databaseService.recipe
            .findMany({
                where: this.or(searchString),
                take: this.take(take),
                skip: this.skip(skip),
                orderBy: this.orderBy(orderBy),
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOne(uuid: string): Promise<Recipe | null> {
        return await this.databaseService.recipe
            .findUnique({
                where: {
                    uuid,
                },
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async update({
        uuid,
        title,
        description,
        rawUuid,
        categoryUuid,
        recipeTypeUuid,
    }: IRecipeEntity): Promise<Recipe> {
        return await this.databaseService.recipe
            .update({
                where: {
                    uuid,
                },
                data: {
                    title,
                    description,
                    recipeTypeUuid,
                    categoryUuid,
                    rawUuid,
                },
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async remove(uuid: string): Promise<Recipe> {
        return await this.databaseService.recipe
            .delete({
                where: {
                    uuid,
                },
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }
}
