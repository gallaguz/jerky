import { Injectable } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client/scripts/catalog-client';

import { CatalogDatabaseErrorHandlerService } from '../../common';
import { DatabaseService } from '../../database/database.service';
import RecipeFindManyArgs = Prisma.RecipeFindManyArgs;
import { IBaseRepository, TRecipeWithPayload } from '@jerky/interfaces';
import RecipeCreateArgs = Prisma.RecipeCreateArgs;
import RecipeUpdateArgs = Prisma.RecipeUpdateArgs;
import RecipeTypeFindUniqueOrThrowArgs = Prisma.RecipeTypeFindUniqueOrThrowArgs;
import RecipeDeleteArgs = Prisma.RecipeDeleteArgs;

@Injectable()
export class CatalogRecipeRepository
    implements
        IBaseRepository<
            TRecipeWithPayload,
            RecipeCreateArgs,
            RecipeUpdateArgs,
            RecipeFindManyArgs,
            RecipeTypeFindUniqueOrThrowArgs,
            RecipeDeleteArgs
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly catalogDatabaseErrorHandlerService: CatalogDatabaseErrorHandlerService,
    ) {}

    public async create(props: RecipeCreateArgs): Promise<TRecipeWithPayload> {
        return await this.databaseService.recipe
            .create(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async update(props: RecipeUpdateArgs): Promise<TRecipeWithPayload> {
        return await this.databaseService.recipe
            .update(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async remove(props: RecipeDeleteArgs): Promise<Recipe> {
        return await this.databaseService.recipe
            .delete(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findOne(
        props: RecipeTypeFindUniqueOrThrowArgs,
    ): Promise<TRecipeWithPayload | null> {
        return await this.databaseService.recipe
            .findUnique(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findMany(
        props: RecipeFindManyArgs,
    ): Promise<TRecipeWithPayload[]> {
        return await this.databaseService.recipe
            .findMany(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }
}
