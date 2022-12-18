import { BaseService, ICreateServiceBase } from '../../common';
import { Prisma, Product } from '@prisma/client/scripts/catalog-client';
import ProductCreateInput = Prisma.ProductCreateInput;
import { ProductCreate } from '@jerky/contracts';
import { BadRequestException, ConflictException } from '@nestjs/common';
import ProductWhereInput = Prisma.ProductWhereInput;
import { ProductRepository } from '../product.repository';
import { RMQService } from 'nestjs-rmq';
import { ProductEntity } from '../product.entity';
import { IProductDto } from '@jerky/interfaces';

export abstract class ProductCreateServiceBase
    extends BaseService
    implements
        ICreateServiceBase<
            ProductCreate.Request,
            Product,
            ProductEntity,
            ProductCreateInput,
            string
        >
{
    protected constructor(
        private readonly productRepository: ProductRepository,
        rmqService: RMQService,
    ) {
        super(rmqService);
    }

    public async createBase(props: ProductCreate.Request): Promise<Product> {
        const existed: Product | null = await this.isExistBase(props.title);
        if (existed) throw new ConflictException();

        const entity: ProductEntity = this.createEntityBase(props);
        const createInput: ProductCreateInput = this.createQueryBase(entity);
        const created: Product = await this.productRepository.create(
            createInput,
        );
        if (!created) throw new BadRequestException();

        await this.emitCreateEventBase(entity, created);

        return created;
    }

    public createQueryBase(entity: ProductEntity): ProductCreateInput {
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
            uuid: entity.uuid,
            title: entity.title,
            price: entity.price,
            description: entity.description,
            category: { connect: { uuid: entity.categoryUuid } },
            raw: { connect: { uuid: entity.rawUuid } },
            recipe: { connect: { uuid: entity.recipeUuid } },
            recipeType: { connect: { uuid: entity.rawUuid } },
        };
    }

    public createEntityBase(props: ProductCreate.Request): ProductEntity {
        const entityProps: IProductDto = {
            uuid: this.uuid(),
            title: props.title,
            description: props.description,
            price: props.price,
            recipeUuid: props.recipeUuid,
            rawUuid: props.rawUuid,
            categoryUuid: props.categoryUuid,
            recipeTypeUuid: props.recipeTypeUuid,
        };
        return new ProductEntity(entityProps);
    }

    public async isExistBase(title: string): Promise<Product | null> {
        const findOneTitleInput: ProductWhereInput = { title };
        return await this.productRepository.findOneTitle(findOneTitleInput);
    }

    public async emitCreateEventBase(
        entity: ProductEntity,
        created: Product,
    ): Promise<void> {
        entity.createEvent(created);
        await this.handle(entity);
    }
}
