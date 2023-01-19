import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/scripts/catalog-client';

import { CatalogDatabaseErrorHandlerService } from '../../common';
import { DatabaseService } from '../../database/database.service';
import RecipeTypeFindManyArgs = Prisma.RecipeTypeFindManyArgs;
import RecipeTypeCreateArgs = Prisma.RecipeTypeCreateArgs;
import RecipeTypeUpdateArgs = Prisma.RecipeTypeUpdateArgs;
import RecipeTypeFindUniqueOrThrowArgs = Prisma.RecipeTypeFindUniqueOrThrowArgs;
import RecipeTypeDeleteArgs = Prisma.RecipeTypeDeleteArgs;
import { IBaseRepository, TRecipeTypeWithPayload } from '@jerky/interfaces';

@Injectable()
export class CatalogRecipeTypeRepository
    implements
        IBaseRepository<
            TRecipeTypeWithPayload,
            RecipeTypeCreateArgs,
            RecipeTypeUpdateArgs,
            RecipeTypeFindManyArgs,
            RecipeTypeFindUniqueOrThrowArgs,
            RecipeTypeDeleteArgs
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly catalogDatabaseErrorHandlerService: CatalogDatabaseErrorHandlerService,
    ) {}

    public async create(
        props: RecipeTypeCreateArgs,
    ): Promise<TRecipeTypeWithPayload> {
        return await this.databaseService.recipeType
            .create(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async update(
        props: RecipeTypeUpdateArgs,
    ): Promise<TRecipeTypeWithPayload> {
        return await this.databaseService.recipeType
            .update(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async remove(
        props: RecipeTypeDeleteArgs,
    ): Promise<TRecipeTypeWithPayload> {
        return await this.databaseService.recipeType
            .delete(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findOne(
        props: RecipeTypeFindUniqueOrThrowArgs,
    ): Promise<TRecipeTypeWithPayload | null> {
        return await this.databaseService.recipeType
            .findUnique(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findMany(
        props: RecipeTypeFindManyArgs,
    ): Promise<TRecipeTypeWithPayload[]> {
        return await this.databaseService.recipeType
            .findMany(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }
}
