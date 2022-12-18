import { Module } from '@nestjs/common';
import { IngredientService } from './services/ingredient.service';
import { IngredientController } from './ingredient.controller';
import { IngredientRepository } from './ingredient.repository';
import { DatabaseService } from '../database/database.service';
import { IngredientCreateService } from './services/ingredient.create.service';
import { IngredientUpdateService } from './services/ingredient.update.service';
import { IngredientFindService } from './services/ingredient.find.service';
import { IngredientRemoveService } from './services/ingredient.remove.service';
import { IngredientConnectionService } from './services/ingredient.connection.service';

@Module({
    controllers: [IngredientController],
    providers: [
        DatabaseService,
        IngredientService,
        IngredientRepository,
        IngredientCreateService,
        IngredientUpdateService,
        IngredientFindService,
        IngredientRemoveService,
        IngredientConnectionService,
    ],
})
export class IngredientModule {}
