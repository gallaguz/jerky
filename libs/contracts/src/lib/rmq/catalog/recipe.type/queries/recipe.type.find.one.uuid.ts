import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RecipeTypeDto } from '../recipe.type.dto';

export namespace RecipeTypeFindOneUuid {
    export const topic = 'catalog.recipe-type-find-one-uuid.query';

    export class Request extends PickType(RecipeTypeDto, ['uuid'] as const) {}

    export type Response = RecipeType;
}
