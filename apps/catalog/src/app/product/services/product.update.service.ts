import { Injectable } from '@nestjs/common';
import { ProductUpdate } from '@jerky/contracts';
import { IUpdateService } from '../../common';
import { ProductRepository } from '../product.repository';
import { RMQService } from 'nestjs-rmq';
import { Product } from '@prisma/client/scripts/catalog-client';
import { ProductUpdateServiceBase } from './product.update.service.base';

@Injectable()
export class ProductUpdateService
    extends ProductUpdateServiceBase
    implements IUpdateService<ProductUpdate.Request, Product>
{
    constructor(productRepository: ProductRepository, rmqService: RMQService) {
        super(productRepository, rmqService);
    }

    public async update(props: ProductUpdate.Request): Promise<Product> {
        return await this.updateBase(props);
    }
}
