import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { UUUIDService } from '../../common/uuid.service';

@Module({
    controllers: [IngredientController],
    providers: [IngredientService, UUUIDService],
})
export class IngredientModule {}
