import { Body, Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
    ProductCreate,
    ProductFindFiltered,
    ProductFindOne,
    ProductRemove,
    ProductUpdate,
} from '@jerky/contracts';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // @RMQValidate()
    // @RMQRoute(ProductCreate.topic)
    // public async create(
    //     @Body() props: ProductCreate.Request,
    // ): Promise<ProductCreate.Response> {
    //     return await this.productService.create(props);
    // }
    //
    // @RMQValidate()
    // @RMQRoute(ProductFindFiltered.topic)
    // public async findFiltered(
    //     @Body() props: ProductFindFiltered.Request,
    // ): Promise<ProductFindFiltered.Response> {
    //     return await this.productService.findFiltered(props);
    // }
    //
    // @RMQValidate()
    // @RMQRoute(ProductFindOne.topic)
    // public async findOne(
    //     @Body() props: ProductFindOne.Request,
    // ): Promise<ProductFindOne.Response> {
    //     return await this.productService.findOne(props);
    // }
    //
    // @RMQValidate()
    // @RMQRoute(ProductUpdate.topic)
    // public async update(
    //     @Body() props: ProductUpdate.Request,
    // ): Promise<ProductUpdate.Response> {
    //     return await this.productService.update(props);
    // }
    //
    // @RMQValidate()
    // @RMQRoute(ProductRemove.topic)
    // public async remove(
    //     @Body() props: ProductRemove.Request,
    // ): Promise<ProductRemove.Response> {
    //     return await this.productService.remove(props);
    // }
}
