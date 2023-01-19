import {
    Category,
    Ingredient,
    Prisma,
    Product,
    Raw,
    RawType,
    Recipe,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';

import { TModelBase } from '../common';
import CategoryInclude = Prisma.CategoryInclude;
import CategoryGetPayload = Prisma.CategoryGetPayload;
import CategorySelect = Prisma.CategorySelect;
import RawGetPayload = Prisma.RawGetPayload;
import RawInclude = Prisma.RawInclude;
import RawTypeGetPayload = Prisma.RawTypeGetPayload;
import RawTypeInclude = Prisma.RawTypeInclude;
import RawTypeSelect = Prisma.RawTypeSelect;
import ProductSelect = Prisma.ProductSelect;
import ProductGetPayload = Prisma.ProductGetPayload;
import ProductInclude = Prisma.ProductInclude;
import IngredientSelect = Prisma.IngredientSelect;
import IngredientGetPayload = Prisma.IngredientGetPayload;
import IngredientInclude = Prisma.IngredientInclude;
import RecipeInclude = Prisma.RecipeInclude;
import RecipeTypeGetPayload = Prisma.RecipeTypeGetPayload;
import RecipeTypeInclude = Prisma.RecipeTypeInclude;
import RecipeTypeSelect = Prisma.RecipeTypeSelect;
import RecipeGetPayload = Prisma.RecipeGetPayload;
import RecipeSelect = Prisma.RecipeSelect;

/**  Base  **/
export type TCatalogModelBase = TModelBase & {
    alias?: string | null;
    title?: string | null;
    description?: string | null;
};
export type TCatalogUpdateBase = {
    createdAt?: Date | null;
    updatedAt?: Date | null;
    alias?: string | null;
    title?: string | null;
    description?: string | null;
};
/**  Category  **/
export type TCategory = TCatalogModelBase;
export type TCategoryUpdate = TCatalogUpdateBase;
export type TCategoryWithIncludePayload = Category &
    CategoryGetPayload<{
        include: CategoryInclude;
    }>;
export type TCategoryWithSelectPayload = CategoryGetPayload<{
    select: CategorySelect;
}>;
export type TCategoryWithPayload =
    | TCategoryWithSelectPayload
    | TCategoryWithIncludePayload;
/**  Product  **/
export type TProduct = TCatalogModelBase & {
    price?: number | null;
};
export type IProductUpdate = TCatalogUpdateBase & {
    price?: number;
};
export type TProductWithIncludePayload = Product &
    ProductGetPayload<{
        include: ProductInclude;
    }>;
export type TProductWithSelectPayload = ProductGetPayload<{
    select: ProductSelect;
}>;
export type TProductWithPayload =
    | TProductWithSelectPayload
    | TProductWithIncludePayload;
/**  Ingredient  **/
export type TIngredient = TCatalogModelBase & {
    price?: number | null;
    payload?: number | null;
    type?: string | null;
};
export type TIngredientUpdate = TCatalogUpdateBase & {
    price?: number;
    payload?: number;
    type?: string;
};
export type TIngredientWithIncludePayload = Ingredient &
    IngredientGetPayload<{
        include: IngredientInclude;
    }>;
export type TIngredientWithSelectPayload = IngredientGetPayload<{
    select: IngredientSelect;
}>;
export type TIngredientWithPayload =
    | TIngredientWithSelectPayload
    | TIngredientWithIncludePayload;
/**  Raw  **/
export type TRaw = TCatalogModelBase & {
    price?: number | null;
    payload?: number | null;
};
export type TRawUpdate = TCatalogUpdateBase & {
    price?: number;
    payload?: number;
};
export type TRawWithIncludePayload = Raw &
    RawGetPayload<{
        include: RawInclude;
    }>;
export type TRawWithSelectPayload = CategoryGetPayload<{
    select: CategorySelect;
}>;
export type TRawWithPayload = TRawWithSelectPayload | TRawWithIncludePayload;
/**  RawType  **/
export type TRawType = TCatalogModelBase;
export type TRawTypeUpdate = TCatalogUpdateBase;
export type TRawTypeWithIncludePayload = RawType &
    RawTypeGetPayload<{
        include: RawTypeInclude;
    }>;
export type TRawTypeWithSelectPayload = RawTypeGetPayload<{
    select: RawTypeSelect;
}>;
export type TRawTypeWithPayload =
    | TRawTypeWithSelectPayload
    | TRawTypeWithIncludePayload;
/**  Recipe  **/
export type TRecipe = TCatalogModelBase;
export type TRecipeUpdate = TCatalogUpdateBase;
export type TRecipeWithIncludePayload = Recipe &
    RecipeGetPayload<{
        include: RecipeInclude;
    }>;
export type TRecipeWithSelectPayload = RecipeGetPayload<{
    select: RecipeSelect;
}>;
export type TRecipeWithPayload =
    | TRecipeWithSelectPayload
    | TRecipeWithIncludePayload;
/**  RecipeType  **/
export type TRecipeType = TCatalogModelBase;
export type TRecipeTypeUpdate = TCatalogUpdateBase;
export type TRecipeTypeWithIncludePayload = RecipeType &
    RecipeTypeGetPayload<{
        include: RecipeTypeInclude;
    }>;
export type TRecipeTypeWithSelectPayload = RecipeTypeGetPayload<{
    select: RecipeTypeSelect;
}>;
export type TRecipeTypeWithPayload =
    | TRecipeTypeWithSelectPayload
    | TRecipeTypeWithIncludePayload;
