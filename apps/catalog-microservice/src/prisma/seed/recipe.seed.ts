import {
    Category,
    Ingredient,
    Prisma,
    PrismaClient,
    Raw,
    RawType,
    Recipe,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';
import RecipeCreateInput = Prisma.RecipeCreateInput;
import * as process from 'process';
import * as slug from 'slug';

import { pickNumberInRange, pickObj } from './common/helper';
import IngredientCoefficientCreateInput = Prisma.IngredientCoefficientCreateInput;
import * as crypto from 'crypto';

const prismaClient = new PrismaClient();

type TRecipeInput = {
    title: string;
    description: string;
};

const recipes: TRecipeInput[] = [
    {
        title: 'Salty',
        description: 'Clear taste',
    },
    {
        title: 'Spicy',
        description: 'If your life boring',
    },
    {
        title: 'Spicy BH',
        description: 'Feel new concept (But Hurt)',
    },
    {
        title: 'Spicy HD',
        description: 'If your life boring (Hole Destroyer)',
    },
    {
        title: 'Marinated Simple',
        description: 'Some taste from chief',
    },
    {
        title: 'Marinated Special',
        description: 'If you want something special',
    },
    {
        title: 'Marinated BBQ',
        description: 'Simple BBQ flavor',
    },
];

const main = async (
    recipes: TRecipeInput[],
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
    rawTypes: RawType[],
    ingredients: Ingredient[],
): Promise<Recipe[]> => {
    const createdRecipes: Recipe[] = [];

    for (const recipe of recipes) {
        const categoryUuid = pickObj(categories, 1)[0].uuid;
        const recipeTypeUuid = pickObj(recipeTypes, 1)[0].uuid;
        const rawUuid = pickObj(raws, 1)[0].uuid;
        const rawTypeUuid = pickObj(rawTypes, 1)[0].uuid;
        const ingredientUuids: { uuid: string }[] = pickObj(
            ingredients,
            pickNumberInRange(1, ingredients.length - 1),
        ).map((el) => {
            return { uuid: el.uuid };
        });
        const ingredientCoefficients: IngredientCoefficientCreateInput[] =
            ingredientUuids.map((el) => {
                return {
                    coefficient: pickNumberInRange(1, 100),
                    ingredientUuid: el.uuid,
                };
            });

        const title = recipe.title + ' ' + crypto.randomUUID();
        const data: RecipeCreateInput = {
            alias: slug(title),
            title: title,
            description: recipe.description,
            category: {
                connect: {
                    uuid: categoryUuid,
                },
            },
            recipeType: {
                connect: {
                    uuid: recipeTypeUuid,
                },
            },
            raw: {
                connect: {
                    uuid: rawUuid,
                },
            },
            rawType: {
                connect: {
                    uuid: rawTypeUuid,
                },
            },
            ingredientCoefficient: {
                createMany: {
                    data: ingredientCoefficients,
                },
            },
        };

        createdRecipes.push(await prismaClient.recipe.create({ data }));
    }

    return createdRecipes;
};

export const seedRecipes = async (
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
    rawTypes: RawType[],
    ingredients: Ingredient[],
): Promise<Recipe[]> => {
    const start = performance.now();

    return await main(
        recipes,
        recipeTypes,
        categories,
        raws,
        rawTypes,
        ingredients,
    )
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        })
        .finally(async () => {
            await prismaClient.$disconnect().then(() => {
                const end = Math.floor(performance.now() - start);
                console.log(`--- Recipe Seeded in ${end} ms ---`);
            });
        });
};
