import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { IngredientRepository } from './ingredient.repository';
import { DatabaseService } from '../database/database.service';

@Module({
    controllers: [IngredientController],
    providers: [DatabaseService, IngredientService, IngredientRepository],
})
export class IngredientModule {}
