import {
    Category,
    Ingredient,
    PrismaClient,
    Raw,
    Recipe,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';
import * as crypto from 'crypto';
import { faker } from '@faker-js/faker';

const prismaClient = new PrismaClient();

export interface IUuid {
    uuid: string;
}

export interface IIngredientConnect {
    connect: IUuid;
}

export interface IIngredientQty {
    uuid: string;
    qtyPerKg: number;
    ingredient: IIngredientConnect;
}

export interface IRecipe {
    uuid: string;
    title: string;
    description: string;
    recipeTypeUuid: string;
    categoryUuid: string;
    rawUuid: string;
    ingredientsQty: IIngredientQty[];
}

// const recipes = [
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Salty',
//         description: 'Clear taste',
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Spicy',
//         description: 'If your life boring',
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Spicy BH',
//         description: 'Feel new concept (But Hurt)',
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Spicy HD',
//         description: 'If your life boring (Hole Destroyer)',
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Marinated Simple',
//         description: 'Some taste from chief',
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Marinated Special',
//         description: 'If you want something special',
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Marinated BBQ',
//         description: 'Simple BBQ flavor',
//     },
// ];

export const pickRandomNumberInRange = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;
export const pickRandomNumber = (): number => Math.floor(Math.random());
export const pickRandomObj = <T>(items: T[], count = 1): T[] => {
    const arr = [];

    for (let i = 0; i < count; i++) {
        arr.push(items[pickRandomNumber() * items.length]);
    }

    return arr;
};

const saveRecipe = async ({
    uuid,
    description,
    title,
    recipeTypeUuid,
    categoryUuid,
    rawUuid,
    ingredientsQty,
}: IRecipe): Promise<Recipe> => {
    return await prismaClient.recipe
        .create({
            data: {
                uuid,
                title,
                description,
                recipeTypeUuid,
                categoryUuid,
                rawUuid,
                ingredientQty: {
                    create: <IIngredientQty[]>ingredientsQty,
                },
            },
        })
        .catch((e) => {
            console.log(e);
            throw e;
        });
};

const main = async (
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
    ingredients: Ingredient[],
): Promise<Recipe[]> => {
    const createdRecipes: Recipe[] = [];

    for (let i = 0; i < pickRandomNumber(); i++) {
        const recipeType =
            recipeTypes[pickRandomNumberInRange(0, recipeTypes.length - 1)];
        const category =
            categories[pickRandomNumberInRange(0, categories.length - 1)];
        const raw = raws[pickRandomNumberInRange(0, raws.length - 1)];

        const ingredientsUuids = pickRandomObj(
            ingredients,
            pickRandomNumberInRange(3, 10),
        ).map((ingredient) => ({
            uuid: ingredient.uuid,
        }));

        const ingredientsQty = ingredientsUuids.map((el) => {
            return {
                uuid: crypto.randomUUID(),
                qtyPerKg: Math.floor(Math.random() * 100),
                ingredient: {
                    connect: { uuid: el.uuid },
                },
            };
        });

        const recipe = {
            uuid: crypto.randomUUID(),
            title: `${raw.title} ${recipeType.title} ${category.title}`,
            description: faker.commerce.productDescription(),
            recipeTypeUuid: recipeType.uuid,
            categoryUuid: category.uuid,
            rawUuid: raw.uuid,
            ingredientsQty,
        };

        createdRecipes.push(await saveRecipe(recipe));
    }
    return createdRecipes;
};

export const seedRecipes = async (
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
    ingredients: Ingredient[],
): Promise<Recipe[]> => {
    return await main(recipeTypes, categories, raws, ingredients)
        .then(async (res) => {
            await prismaClient.$disconnect();
            // console.log(res);
            return res;
        })
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        });
};
