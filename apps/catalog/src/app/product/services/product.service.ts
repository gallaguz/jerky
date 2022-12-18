import { Injectable } from '@nestjs/common';
import {
    ProductCreate,
    ProductFindFiltered,
    ProductFindOneTitle,
    ProductFindOneUuid,
    ProductRemove,
    ProductUpdate,
} from '@jerky/contracts';
import { Product } from '@prisma/client/scripts/catalog-client';
import { IBaseService } from '../../common';
import { ProductFindService } from './product.find.service';
import { ProductRemoveService } from './product.remove.service';
import { ProductCreateService } from './product.create.service';
import { ProductUpdateService } from './product.update.service';

@Injectable()
export class ProductService
    implements
        IBaseService<
            Product,
            ProductCreate.Request,
            ProductFindFiltered.Request,
            ProductFindOneUuid.Request,
            ProductFindOneTitle.Request,
            ProductUpdate.Request,
            ProductRemove.Request
        >
{
    constructor(
        private readonly productCreateService: ProductCreateService,
        private readonly productUpdateService: ProductUpdateService,
        private readonly productFindService: ProductFindService,
        private readonly productRemoveService: ProductRemoveService,
    ) {}

    public async create(props: ProductCreate.Request): Promise<Product> {
        return this.productCreateService.create(props);
    }

    public async findFiltered(
        props: ProductFindFiltered.Request,
    ): Promise<Product[]> {
        return await this.productFindService.findFiltered(props);
    }

    public async findOneUuid(
        props: ProductFindOneUuid.Request,
    ): Promise<Product> {
        return await this.productFindService.findOneUuid(props);
    }

    public async findOneTitle(
        props: ProductFindOneTitle.Request,
    ): Promise<Product> {
        return await this.productFindService.findOneTitle(props);
    }

    public async update(props: ProductUpdate.Request): Promise<Product> {
        return await this.productUpdateService.update(props);
    }

    public async remove(props: ProductRemove.Request): Promise<Product> {
        return await this.productRemoveService.remove(props);
    }
}
