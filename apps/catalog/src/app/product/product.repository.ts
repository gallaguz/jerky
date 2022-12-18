import { BadRequestException, Injectable } from '@nestjs/common';
import { IBaseRepository, BaseRepository } from '../common';
import { Prisma, Product } from '@prisma/client/scripts/catalog-client';
import ProductCreateInput = Prisma.ProductCreateInput;
import ProductFindManyArgs = Prisma.ProductFindManyArgs;
import ProductWhereInput = Prisma.ProductWhereInput;
import ProductUpdateInput = Prisma.ProductUpdateInput;
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import ProductWhereUniqueInput = Prisma.ProductWhereUniqueInput;

@Injectable()
export class ProductRepository
    extends BaseRepository
    implements
        IBaseRepository<
            Product,
            ProductCreateInput,
            ProductUpdateInput,
            ProductFindManyArgs,
            ProductWhereUniqueInput,
            ProductWhereInput,
            ProductWhereUniqueInput
        >
{
    constructor(
        protected readonly databaseService: DatabaseService,
        protected readonly configService: ConfigService,
    ) {
        super();
    }

    public async create(props: ProductCreateInput): Promise<Product> {
        return await this.databaseService.product
            .create({ data: props })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findFiltered(props: ProductFindManyArgs): Promise<Product[]> {
        return await this.databaseService.product
            .findMany(props)
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneUuid(
        props: ProductWhereUniqueInput,
    ): Promise<Product | null> {
        return await this.databaseService.product
            .findUnique({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }

    public async findOneTitle(
        props: ProductWhereInput,
    ): Promise<Product | null> {
        return await this.databaseService.product
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
        props: ProductUpdateInput,
    ): Promise<Product> {
        return await this.databaseService.product
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

    public async remove(props: ProductWhereUniqueInput): Promise<Product> {
        return await this.databaseService.product
            .delete({
                where: props,
            })
            .catch((error) => {
                this.handleError(error);
                throw new BadRequestException(SOMETHING_WENT_WRONG);
            });
    }
}
