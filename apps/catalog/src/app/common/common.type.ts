import {
    Category,
    Ingredient,
    Prisma,
    Product,
    Raw,
    Recipe,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';
import CategoryCreateArgs = Prisma.CategoryCreateArgs;
import IngredientCreateArgs = Prisma.IngredientCreateArgs;
import RecipeCreateArgs = Prisma.RecipeCreateArgs;
import ProductCreateArgs = Prisma.ProductCreateArgs;
import RecipeTypeCreateArgs = Prisma.RecipeTypeCreateArgs;
import RawCreateArgs = Prisma.RawCreateArgs;
import CategoryUpdateInput = Prisma.CategoryUpdateInput;
import RecipeUpdateInput = Prisma.RecipeUpdateInput;
import RecipeTypeUpdateInput = Prisma.RecipeTypeUpdateInput;
import ProductUpdateInput = Prisma.ProductUpdateInput;
import IngredientUpdateInput = Prisma.IngredientUpdateInput;
import RawUpdateInput = Prisma.RawUpdateInput;
import ProductFindManyArgs = Prisma.ProductFindManyArgs;
import RecipeTypeFindManyArgs = Prisma.RecipeTypeFindManyArgs;
import RawFindManyArgs = Prisma.RawFindManyArgs;
import IngredientFindManyArgs = Prisma.IngredientFindManyArgs;
import RecipeFindManyArgs = Prisma.RecipeFindManyArgs;
import CategoryFindManyArgs = Prisma.CategoryFindManyArgs;
import RecipeWhereUniqueInput = Prisma.RecipeWhereUniqueInput;
import CategoryWhereUniqueInput = Prisma.CategoryWhereUniqueInput;
import IngredientWhereUniqueInput = Prisma.IngredientWhereUniqueInput;
import ProductWhereUniqueInput = Prisma.ProductWhereUniqueInput;
import RecipeTypeWhereUniqueInput = Prisma.RecipeTypeWhereUniqueInput;
import RawWhereUniqueInput = Prisma.RawWhereUniqueInput;
import RecipeWhereInput = Prisma.RecipeWhereInput;
import IngredientWhereInput = Prisma.IngredientWhereInput;
import RawWhereInput = Prisma.RawWhereInput;
import ProductWhereInput = Prisma.ProductWhereInput;
import CategoryWhereInput = Prisma.CategoryWhereInput;
import RecipeTypeWhereInput = Prisma.RecipeTypeWhereInput;
import ProductCreateInput = Prisma.ProductCreateInput;
import RecipeCreateInput = Prisma.RecipeCreateInput;
import IngredientCreateInput = Prisma.IngredientCreateInput;
import RecipeTypeCreateInput = Prisma.RecipeTypeCreateInput;
import CategoryCreateInput = Prisma.CategoryCreateInput;
import RawCreateInput = Prisma.RawCreateInput;

export type DatabaseModel =
    | Category
    | Recipe
    | RecipeType
    | Raw
    | Product
    | Ingredient;

export type DatabaseModelsKey =
    | 'recipe'
    | 'recipeType'
    | 'raw'
    | 'product'
    | 'category'
    | 'ingredient';

export type CreateInput =
    | CategoryCreateInput
    | RecipeCreateInput
    | RecipeTypeCreateInput
    | RawCreateInput
    | ProductCreateInput
    | IngredientCreateInput;

export type UpdateInput =
    | CategoryUpdateInput
    | ProductUpdateInput
    | RecipeUpdateInput
    | RecipeTypeUpdateInput
    | RawUpdateInput
    | IngredientUpdateInput;

export type FindManyArgs =
    | CategoryFindManyArgs
    | ProductFindManyArgs
    | RecipeFindManyArgs
    | RecipeTypeFindManyArgs
    | RawFindManyArgs
    | IngredientFindManyArgs;

export type WhereUniqueInput =
    | CategoryWhereUniqueInput
    | ProductWhereUniqueInput
    | RecipeWhereUniqueInput
    | RecipeTypeWhereUniqueInput
    | RawWhereUniqueInput
    | IngredientWhereUniqueInput;

export type WhereInput =
    | CategoryWhereInput
    | ProductWhereInput
    | RecipeWhereInput
    | RecipeTypeWhereInput
    | RawWhereInput
    | IngredientWhereInput;
