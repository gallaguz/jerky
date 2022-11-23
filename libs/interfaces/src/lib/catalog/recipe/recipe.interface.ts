export interface IRecipeEntity {
    uuid: string;
    recipeTypeUuid: string;
    categoryUuid: string;
    rawUuid: string;
    title: string;
    description: string;
}

export interface IRecipeProps {
    recipeTypeUuid?: string | null;
    categoryUuid?: string | null;
    rawUuid?: string | null;
    title?: string | null;
    description?: string | null;
}
