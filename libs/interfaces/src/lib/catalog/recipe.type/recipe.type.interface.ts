export interface IRecipeTypeEntity {
    uuid: string;
    title: string;
    description: string;
}

export interface IRecipeTypeProps {
    title?: string | null;
    description?: string | null;
}
