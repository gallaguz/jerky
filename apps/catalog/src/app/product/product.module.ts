import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { DatabaseService } from '../database/database.service';

@Module({
    controllers: [ProductController],
    providers: [ProductService, DatabaseService, ProductRepository],
})
export class ProductModule {}
