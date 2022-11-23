import { Injectable } from '@nestjs/common';
import {
    ProductCreate,
    ProductFindFiltered,
    ProductFindOne,
    ProductRemove,
    ProductUpdate,
} from '@jerky/contracts';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    // public async create(props: ProductCreate.Request): Promise<ProductEntity> {
    //     const productEntity = new ProductEntity(undefined, props);
    //
    //     const createdProduct = await this.productRepository.create(
    //         productEntity,
    //     );
    // }
    //
    // public async findFiltered(
    //     props: ProductFindFiltered.Request,
    // ): Promise<ProductEntity[]> {
    //     //
    // }
    //
    // public async findOne(
    //     props: ProductFindOne.Request,
    // ): Promise<ProductEntity> {
    //     //
    // }
    //
    // public async update(props: ProductUpdate.Request): Promise<ProductEntity> {
    //     //
    // }
    //
    // public async remove(props: ProductRemove.Request): Promise<ProductEntity> {
    //     //
    // }
}
