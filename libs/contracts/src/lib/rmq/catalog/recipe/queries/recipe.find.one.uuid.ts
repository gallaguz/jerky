import { Recipe } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RecipeDto } from '../recipe.dto';

export namespace RecipeFindOneUuid {
    export const topic = 'catalog.recipe-find-one-uuid.query';

    export class Request extends PickType(RecipeDto, ['uuid'] as const) {
        uuid: string;
    }

    export type Response = Recipe;
}
