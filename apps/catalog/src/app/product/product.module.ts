import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { DatabaseService } from '../database/database.service';
import { ProductCreateService } from './services/product.create.service';
import { ProductUpdateService } from './services/product.update.service';
import { ProductFindService } from './services/product.find.service';
import { ProductRemoveService } from './services/product.remove.service';

@Module({
    controllers: [ProductController],
    providers: [
        ProductService,
        DatabaseService,
        ProductRepository,
        ProductCreateService,
        ProductUpdateService,
        ProductFindService,
        ProductRemoveService,
    ],
})
export class ProductModule {}
