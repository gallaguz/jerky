import {
    Ingredient,
    IngredientQty,
    PrismaClient,
    Recipe,
} from '@prisma/client/scripts/catalog-client';
import * as crypto from 'crypto';
import { faker } from '@faker-js/faker';
import { pickRandomInRange, pickRandomObj } from './recipe.seed';

const prismaClient = new PrismaClient();

export interface IIngredientQty {
    uuid: string;
    qtyPerKg: number;
}

const saveIngredientQty = async (
    { uuid, qtyPerKg }: IIngredientQty,
    ingredientsUuid: string,
    recipeUuid: string,
): Promise<IngredientQty> => {
    try {
        return await prismaClient.ingredientQty.create({
            data: {
                uuid,
                qtyPerKg,
                ingredient: {
                    connect: { uuid: ingredientsUuid },
                },
                recipe: {
                    connect: { uuid: recipeUuid },
                },
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const main = async (
    recipes: Recipe[],
    ingredients: Ingredient[],
): Promise<IngredientQty[]> => {
    const createdIngredientQtys: IngredientQty[] = [];

    for (const recipe of recipes) {
        const ingredientUuidsCount = pickRandomInRange(1, ingredients.length);
        for (let i = 0; i < ingredientUuidsCount; i++) {
            const ingredientUuid = pickRandomObj(ingredients).map(
                (ingredient) => ({
                    uuid: ingredient.uuid,
                }),
            );

            createdIngredientQtys.push(
                await saveIngredientQty(
                    {
                        uuid: crypto.randomUUID(),
                        qtyPerKg: Math.floor(Math.random() * 100),
                    },
                    ingredientUuid[0].uuid,
                    recipe.uuid,
                ),
            );
        }
    }

    return createdIngredientQtys;
};

export const seedIngredientQtys = async (
    recipes: Recipe[],
    ingredients: Ingredient[],
): Promise<IngredientQty[]> => {
    return await main(recipes, ingredients)
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
