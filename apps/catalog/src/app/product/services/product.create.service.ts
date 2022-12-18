import { Injectable } from '@nestjs/common';
import { ProductCreate } from '@jerky/contracts';
import { ProductRepository } from '../product.repository';
import { ICreateService } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { Product } from '@prisma/client/scripts/catalog-client';
import { ProductCreateServiceBase } from './product.create.service.base';

@Injectable()
export class ProductCreateService
    extends ProductCreateServiceBase
    implements ICreateService<ProductCreate.Request, Product>
{
    constructor(productRepository: ProductRepository, rmqService: RMQService) {
        super(productRepository, rmqService);
    }

    public async create(props: ProductCreate.Request): Promise<Product> {
        return this.createBase(props);
    }
}
