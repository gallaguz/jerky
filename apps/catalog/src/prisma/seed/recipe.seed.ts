import {
    Category,
    PrismaClient,
    Raw,
    Recipe,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';
import * as crypto from 'crypto';
import { faker } from '@faker-js/faker';

const prismaClient = new PrismaClient();

export interface IRecipe {
    uuid: string;
    title: string;
    description: string;
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

export const pickRandomInRange = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;
export const pickRandomNumber = Math.floor(Math.random());
export const pickRandomObj = <T>(items: T[], count = 1): T[] => {
    const arr = [];

    for (let i = 0; i < count; i++) {
        arr.push(items[pickRandomNumber * items.length]);
    }

    return arr;
};

const saveRecipe = async (
    { uuid, description, title }: IRecipe,
    recipeTypeUuid: string,
    categoryUuid: string,
    rawUuid: string,
): Promise<Recipe> => {
    try {
        return await prismaClient.recipe.create({
            data: {
                uuid,
                title,
                description,
                recipeTypeUuid,
                categoryUuid,
                rawUuid,
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const main = async (
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
): Promise<Recipe[]> => {
    const createdRecipes: Recipe[] = [];
    for (let i = 0; i < 100; i++) {
        const recipeType =
            recipeTypes[pickRandomInRange(0, recipeTypes.length - 1)];
        const category =
            categories[pickRandomInRange(0, categories.length - 1)];
        const raw = raws[pickRandomInRange(0, raws.length - 1)];

        createdRecipes.push(
            await saveRecipe(
                {
                    uuid: crypto.randomUUID(),
                    title: `${raw.title} ${recipeType.title} ${category.title}`,
                    description: faker.commerce.productDescription(),
                },
                recipeType.uuid,
                category.uuid,
                raw.uuid,
            ),
        );
    }
    return createdRecipes;
};

export const seedRecipes = async (
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
): Promise<Recipe[]> => {
    return await main(recipeTypes, categories, raws)
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
