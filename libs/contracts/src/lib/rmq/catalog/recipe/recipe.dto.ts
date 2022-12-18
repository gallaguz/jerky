import { BaseCatalogDto } from '../../../common';

export class RecipeDto extends BaseCatalogDto {
    recipeTypeUuid: string;
    categoryUuid: string;
    rawUuid: string;
}
