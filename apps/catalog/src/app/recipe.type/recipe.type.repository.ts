import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import { IRecipeTypeEntity } from '@jerky/interfaces';
import { FindFiltered } from '@jerky/contracts';
import { RepositoryHelper, IBaseRepository } from '../common/base.repository';

@Injectable()
export class RecipeTypeRepository
    extends RepositoryHelper
    implements IBaseRepository<RecipeType>
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
    }: IRecipeTypeEntity): Promise<RecipeType> {
        return await this.databaseService.recipeType
            .create({
                data: {
                    uuid,
                    title,
                    description,
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
    }: FindFiltered): Promise<RecipeType[]> {
        return await this.databaseService.recipeType
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

    public async findOne(uuid: string): Promise<RecipeType | null> {
        return await this.databaseService.recipeType
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
    }: IRecipeTypeEntity): Promise<RecipeType> {
        return await this.databaseService.recipeType
            .update({
                where: {
                    uuid,
                },
                data: {
                    title,
                    description,
                },
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async remove(uuid: string): Promise<RecipeType> {
        return await this.databaseService.recipeType
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
