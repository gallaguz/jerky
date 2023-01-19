import { Injectable } from '@nestjs/common';
import { Prisma, RawType } from '@prisma/client/scripts/catalog-client';

import { CatalogDatabaseErrorHandlerService } from '../../common';
import { DatabaseService } from '../../database/database.service';
import RawTypeFindManyArgs = Prisma.RawTypeFindManyArgs;
import RawTypeFindUniqueOrThrowArgs = Prisma.RawTypeFindUniqueOrThrowArgs;
import RawTypeUpdateArgs = Prisma.RawTypeUpdateArgs;
import RawTypeCreateArgs = Prisma.RawTypeCreateArgs;
import RawTypeDeleteArgs = Prisma.RawTypeDeleteArgs;
import { IBaseRepository } from '@jerky/interfaces';

@Injectable()
export class CatalogRawTypeRepository
    implements
        IBaseRepository<
            RawType,
            RawTypeCreateArgs,
            RawTypeUpdateArgs,
            RawTypeFindManyArgs,
            RawTypeFindUniqueOrThrowArgs,
            RawTypeDeleteArgs
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly catalogDatabaseErrorHandlerService: CatalogDatabaseErrorHandlerService,
    ) {}

    public async create(props: RawTypeCreateArgs): Promise<RawType> {
        return await this.databaseService.rawType
            .create(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async update(props: RawTypeUpdateArgs): Promise<RawType> {
        return await this.databaseService.rawType
            .update(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async remove(props: RawTypeDeleteArgs): Promise<RawType> {
        return await this.databaseService.rawType
            .delete(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findOne(
        props: RawTypeFindUniqueOrThrowArgs,
    ): Promise<RawType | null> {
        return await this.databaseService.rawType
            .findUnique(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findMany(props: RawTypeFindManyArgs): Promise<RawType[]> {
        return await this.databaseService.rawType
            .findMany(props)
            .catch((error) => {
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }
}
