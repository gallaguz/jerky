import { Injectable } from '@nestjs/common';
import { ProductRemove } from '@jerky/contracts';
import { ProductRepository } from '../product.repository';
import { RMQService } from 'nestjs-rmq';
import { Product } from '@prisma/client/scripts/catalog-client';
import { IRemoveService } from '../../common';
import { ProductRemoveServiceBase } from './product.remove.service.base';

@Injectable()
export class ProductRemoveService
    extends ProductRemoveServiceBase
    implements IRemoveService<ProductRemove.Request, Product>
{
    constructor(productRepository: ProductRepository, rmqService: RMQService) {
        super(productRepository, rmqService);
    }

    public async remove(props: ProductRemove.Request): Promise<Product> {
        return await this.removeBase(props);
    }
}
