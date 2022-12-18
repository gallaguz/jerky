export enum OrderBy {
    ASC = 'asc',
    DESC = 'desc',
}

export enum Role {
    MODERATOR = 'MODERATOR',
    USER = 'USER',
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
}

export enum ConnectionActions {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
}

export enum ConnectionModelNames {
    CATEGORY = 'category',
    RAW = 'raw',
    INGREDIENT = 'ingredient',
    RECIPE = 'recipe',
    RECIPE_TYPE = 'recipeType',
    PRODUCT = 'product',
    INGREDIENT_QTY = 'ingredientQty',
}

export enum RawConnectionModelNames {
    CATEGORY = 'category',
}

export enum IngredientConnectionModelNames {
    CATEGORY = 'ingredientQty',
}
