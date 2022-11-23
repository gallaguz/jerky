import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // @UsePipes(new ValidationPipe())
    // @Post()
    // public async create(@Body() dto) {
    //     return this.productService.create(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Post('find')
    // public async findFiltered(@Body() dto) {
    //     return this.productService.findFiltered(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Get(':uuid')
    // public async findOne(@Param() dto) {
    //     return this.productService.findOne(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Patch()
    // public async update(@Body() dto) {
    //     return this.productService.update(dto);
    // }
    //
    // @UsePipes(new ValidationPipe())
    // @Delete(':uuid')
    // public async remove(@Param() dto) {
    //     return this.productService.remove(dto);
    // }
}
