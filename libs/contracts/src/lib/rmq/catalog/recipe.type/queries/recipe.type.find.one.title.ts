import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RecipeTypeDto } from '../recipe.type.dto';

export namespace RecipeTypeFindOneTitle {
    export const topic = 'catalog.recipe-type-find-one-title.query';

    export class Request extends PickType(RecipeTypeDto, ['title'] as const) {}

    export type Response = RecipeType;
}
