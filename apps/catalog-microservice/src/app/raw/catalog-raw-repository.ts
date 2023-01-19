import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/scripts/catalog-client';

import { CatalogDatabaseErrorHandlerService } from '../../common';
import { DatabaseService } from '../../database/database.service';
import RawFindManyArgs = Prisma.RawFindManyArgs;
import RawUpdateArgs = Prisma.RawUpdateArgs;
import { RawFindUniqueOrThrowArgsDto } from '@jerky/contracts';
import RawCreateArgs = Prisma.RawCreateArgs;
import RawDeleteArgs = Prisma.RawDeleteArgs;
import { IBaseRepository, TRawWithPayload } from '@jerky/interfaces';

@Injectable()
export class CatalogRawRepository
    implements
        IBaseRepository<
            TRawWithPayload,
            RawCreateArgs,
            RawUpdateArgs,
            RawFindManyArgs,
            RawFindUniqueOrThrowArgsDto,
            RawDeleteArgs
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly catalogDatabaseErrorHandlerService: CatalogDatabaseErrorHandlerService,
    ) {}

    public async create(props: RawCreateArgs): Promise<TRawWithPayload> {
        return await this.databaseService.raw.create(props).catch((error) => {
            throw this.catalogDatabaseErrorHandlerService.handleError(error);
        });
    }

    public async update(props: RawUpdateArgs): Promise<TRawWithPayload> {
        return await this.databaseService.raw.update(props).catch((error) => {
            throw this.catalogDatabaseErrorHandlerService.handleError(error);
        });
    }

    public async remove(props: RawDeleteArgs): Promise<TRawWithPayload> {
        return await this.databaseService.raw.delete(props).catch((error) => {
            throw this.catalogDatabaseErrorHandlerService.handleError(error);
        });
    }

    public async findOne(
        props: RawFindUniqueOrThrowArgsDto,
    ): Promise<TRawWithPayload | null> {
        return await this.databaseService.raw
            .findUnique(props)
            .catch((error) => {
                console.log(error);
                throw this.catalogDatabaseErrorHandlerService.handleError(
                    error,
                );
            });
    }

    public async findMany(props: RawFindManyArgs): Promise<TRawWithPayload[]> {
        return await this.databaseService.raw.findMany(props).catch((error) => {
            throw this.catalogDatabaseErrorHandlerService.handleError(error);
        });
    }
}
