import { RecipeType } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RecipeTypeDto } from '../recipe.type.dto';

export namespace RecipeTypeCreate {
    export const topic = 'catalog.recipe-type-create.command';

    export class Request extends PickType(RecipeTypeDto, [
        'title',
        'description',
    ] as const) {
        title: string;
    }

    export type Response = RecipeType;
}
