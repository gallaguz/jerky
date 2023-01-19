import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client/scripts/catalog-client';

import { CatalogDatabaseErrorHandlerService } from '../../common';
import ProductFindManyArgs = Prisma.ProductFindManyArgs;
import { DatabaseService } from '../../database/database.service';
import ProductFindUniqueOrThrowArgs = Prisma.ProductFindUniqueOrThrowArgs;
import ProductUpdateArgs = Prisma.ProductUpdateArgs;
import ProductCreateArgs = Prisma.ProductCreateArgs;
import ProductDeleteArgs = Prisma.ProductDeleteArgs;
import { IBaseRepository } from '@jerky/interfaces';

@Injectable()
export class CatalogProductRepository
    implements
        IBaseRepository<
            Product,
            ProductCreateArgs,
            ProductUpdateArgs,
            ProductFindManyArgs,
            ProductFindUniqueOrThrowArgs,
            ProductDeleteArgs
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly catalogDatabaseErrorHandlerService: CatalogDatabaseErrorHandlerService,
    ) {}

    public async create(props: ProductCreateArgs): Promise<Product> {
        return await this.databaseService.product
            .create(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async update(props: ProductUpdateArgs): Promise<Product> {
        return await this.databaseService.product
            .update(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async remove(props: ProductDeleteArgs): Promise<Product> {
        return await this.databaseService.product
            .delete(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findOne(
        props: ProductFindUniqueOrThrowArgs,
    ): Promise<Product | null> {
        return await this.databaseService.product
            .findUnique(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findMany(props: ProductFindManyArgs): Promise<Product[]> {
        return await this.databaseService.product
            .findMany(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }
}
