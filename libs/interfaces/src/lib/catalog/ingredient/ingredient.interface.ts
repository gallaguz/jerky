export interface IIngredientEntity {
    uuid: string;
    title: string;
    description: string;
    price: number;
}

export interface IIngredientProps {
    title?: string | null;
    description?: string | null;
    price?: number | null;
}

// export interface IIngredientQty {
//     uuid: string;
//     qtyPerKg: number;
//     ingredientUuid: string;
// }
