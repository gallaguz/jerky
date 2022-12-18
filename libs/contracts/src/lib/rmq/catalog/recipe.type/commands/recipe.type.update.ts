import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { RecipeTypeDto } from '../recipe.type.dto';

export namespace RecipeTypeUpdate {
    export const topic = 'catalog.recipe-type-update.command';

    export class Request extends PartialType(RecipeTypeDto) {
        uuid: string;
    }

    export type Response = RecipeType;
}
