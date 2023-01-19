import { Injectable } from '@nestjs/common';
import { Ingredient, Prisma } from '@prisma/client/scripts/catalog-client';

import { CatalogDatabaseErrorHandlerService } from '../../common';
import { DatabaseService } from '../../database/database.service';
import IngredientFindManyArgs = Prisma.IngredientFindManyArgs;
import IngredientUpdateArgs = Prisma.IngredientUpdateArgs;
import IngredientCreateArgs = Prisma.IngredientCreateArgs;
import IngredientFindUniqueOrThrowArgs = Prisma.IngredientFindUniqueOrThrowArgs;
import IngredientDeleteArgs = Prisma.IngredientDeleteArgs;
import { IBaseRepository } from '@jerky/interfaces';

@Injectable()
export class CatalogIngredientRepository
    implements
        IBaseRepository<
            Ingredient,
            IngredientCreateArgs,
            IngredientUpdateArgs,
            IngredientFindManyArgs,
            IngredientFindUniqueOrThrowArgs,
            IngredientDeleteArgs
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly catalogDatabaseErrorHandlerService: CatalogDatabaseErrorHandlerService,
    ) {}

    public async create(props: IngredientCreateArgs): Promise<Ingredient> {
        return await this.databaseService.ingredient
            .create(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async update(props: IngredientUpdateArgs): Promise<Ingredient> {
        return await this.databaseService.ingredient
            .update(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async remove(props: IngredientDeleteArgs): Promise<Ingredient> {
        return this.databaseService.ingredient.delete(props).catch((error) => {
            throw this.catalogDatabaseErrorHandlerService.handleError(error);
        });
    }

    public async findOne(
        props: IngredientFindUniqueOrThrowArgs,
    ): Promise<Ingredient | null> {
        return await this.databaseService.ingredient
            .findUnique(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findMany(
        props: IngredientFindManyArgs,
    ): Promise<Ingredient[]> {
        return await this.databaseService.ingredient
            .findMany(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }
}
