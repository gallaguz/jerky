import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { BaseService, IUpdateServiceBase } from '../../common';
import { ProductUpdate } from '@jerky/contracts';
import { ProductRepository } from '../product.repository';
import { Prisma, Product } from '@prisma/client/scripts/catalog-client';
import ProductUpdateInput = Prisma.ProductUpdateInput;
import { RMQService } from 'nestjs-rmq';
import { ProductEntity } from '../product.entity';
import ProductWhereUniqueInput = Prisma.ProductWhereUniqueInput;

@Injectable()
export abstract class ProductUpdateServiceBase
    extends BaseService
    implements
        IUpdateServiceBase<
            ProductUpdate.Request,
            Product,
            ProductEntity,
            ProductUpdateInput,
            string
        >
{
    protected constructor(
        private readonly ProductRepository: ProductRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async updateBase(props: ProductUpdate.Request): Promise<Product> {
        const existed: Product | null = await this.isExistBase(props.uuid);
        if (!existed) throw new NotFoundException();

        const entity: ProductEntity = this.createEntityBase(props);
        entity.update(props);

        const updateInput: ProductUpdateInput = this.updateQueryBase(entity);
        const updated: Product = await this.ProductRepository.update(
            entity.uuid,
            updateInput,
        );
        if (!updated) throw new BadRequestException();

        await this.emitUpdateEventBase(entity, existed, updated);

        return updated;
    }

    public updateQueryBase(entity: ProductEntity): ProductUpdateInput {
        // TODO
        // const categoryUuid = '';
        // const connect = categoryUuid
        //     ? {
        //           connect: {
        //               uuid: categoryUuid,
        //           },
        //       }
        //     : {};
        //
        //
        // .update({
        //     where: {
        //         uuid,
        //     },
        //     data: {
        //         title,
        //         description,
        //         price,
        //         category: connect,
        //     },
        // })
        return {
            title: entity.title,
            price: entity.price,
            description: entity.description,
            category: { connect: { uuid: entity.categoryUuid } },
            raw: { connect: { uuid: entity.rawUuid } },
            recipe: { connect: { uuid: entity.recipeUuid } },
            recipeType: { connect: { uuid: entity.rawUuid } },
        };
    }

    public createEntityBase(props: ProductUpdate.Request): ProductEntity {
        return new ProductEntity(props);
    }

    public async isExistBase(uuid: string): Promise<Product | null> {
        const findOneUuidInput: ProductWhereUniqueInput = { uuid };
        return await this.ProductRepository.findOneUuid(findOneUuidInput);
    }

    public async emitUpdateEventBase(
        entity: ProductEntity,
        existed: Product,
        updated: Product,
    ): Promise<void> {
        entity.updateEvent(existed, updated);
        await this.handle(entity);
    }
}
