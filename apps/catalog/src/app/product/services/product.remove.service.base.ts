import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRemove } from '@jerky/contracts';
import { ProductRepository } from '../product.repository';
import { BaseService, IRemoveServiceBase } from '../../common';
import { RMQService } from 'nestjs-rmq';
import { Prisma, Product } from '@prisma/client/scripts/catalog-client';
import { ProductEntity } from '../product.entity';
import ProductWhereUniqueInput = Prisma.ProductWhereUniqueInput;

@Injectable()
export class ProductRemoveServiceBase
    extends BaseService
    implements
        IRemoveServiceBase<
            ProductRemove.Request,
            Product,
            ProductEntity,
            ProductWhereUniqueInput
        >
{
    constructor(
        private readonly productRepository: ProductRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async removeBase(props: ProductRemove.Request): Promise<Product> {
        const removeInput: ProductWhereUniqueInput =
            this.removeQueryBase(props);

        const removed = await this.productRepository.remove(removeInput);
        if (!removed) throw new NotFoundException();

        const entity = new ProductEntity(removed);

        await this.emitRemoveEventBase(entity, removed);

        return removed;
    }

    public removeQueryBase(
        props: ProductRemove.Request,
    ): ProductWhereUniqueInput {
        return {
            uuid: props.uuid,
        };
    }

    public async emitRemoveEventBase(
        entity: ProductEntity,
        removed: Product,
    ): Promise<void> {
        entity.removeEvent(removed);
        await this.handle(entity);
    }
}
