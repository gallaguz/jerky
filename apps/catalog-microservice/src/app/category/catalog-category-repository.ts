import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/scripts/catalog-client';

import { CatalogDatabaseErrorHandlerService } from '../../common';
import { DatabaseService } from '../../database/database.service';
import CategoryFindManyArgs = Prisma.CategoryFindManyArgs;
import CategoryUpdateArgs = Prisma.CategoryUpdateArgs;
import CategoryFindUniqueOrThrowArgs = Prisma.CategoryFindUniqueOrThrowArgs;
import CategoryCreateArgs = Prisma.CategoryCreateArgs;
import CategoryDeleteArgs = Prisma.CategoryDeleteArgs;
import { IBaseRepository, TCategoryWithPayload } from '@jerky/interfaces';

@Injectable()
export class CatalogCategoryRepository
    implements
        IBaseRepository<
            TCategoryWithPayload,
            CategoryCreateArgs,
            CategoryUpdateArgs,
            CategoryFindManyArgs,
            CategoryFindUniqueOrThrowArgs,
            CategoryDeleteArgs
        >
{
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly catalogDatabaseErrorHandlerService: CatalogDatabaseErrorHandlerService,
    ) {}

    public async create(
        props: CategoryCreateArgs,
    ): Promise<TCategoryWithPayload> {
        return await this.databaseService.category
            .create(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async update(
        props: CategoryUpdateArgs,
    ): Promise<TCategoryWithPayload> {
        return await this.databaseService.category
            .update(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async remove(
        props: CategoryDeleteArgs,
    ): Promise<TCategoryWithPayload> {
        return await this.databaseService.category
            .delete(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findOne(
        props: CategoryFindUniqueOrThrowArgs,
    ): Promise<TCategoryWithPayload | null> {
        return await this.databaseService.category
            .findUnique(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findMany(
        props: CategoryFindManyArgs,
    ): Promise<TCategoryWithPayload[]> {
        return await this.databaseService.category
            .findMany(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }
}
