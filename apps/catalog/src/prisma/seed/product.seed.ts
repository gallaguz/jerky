import {
    Category,
    Ingredient,
    PrismaClient,
    Product,
    Raw,
    Recipe,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';
import * as crypto from 'crypto';
import { pickRandomObj } from './recipe.seed';

const prismaClient = new PrismaClient();

export interface IProduct {
    uuid: string;
    title: string;
    description: string;
    price: number;
}

const saveProduct = async (
    category: Category,
    raw: Raw,
    recipe: Recipe,
    recipeType: RecipeType,
): Promise<Product> => {
    return prismaClient.product.create({
        data: {
            uuid: crypto.randomUUID(),
            title: recipe.title,
            description: recipe.description,
            price: Math.floor(Math.random() * 100),
            category: {
                connect: {
                    uuid: category.uuid,
                },
            },
            raw: {
                connect: {
                    uuid: raw.uuid,
                },
            },
            recipe: {
                connect: {
                    uuid: recipe.uuid,
                },
            },
            recipeType: {
                connect: {
                    uuid: recipeType.uuid,
                },
            },
        },
    });
};

const main = async (
    recipes: Recipe[],
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
): Promise<Product[]> => {
    const createdProducts: Product[] = [];

    for (const recipe of recipes) {
        createdProducts.push(
            await saveProduct(
                pickRandomObj(categories)[0],
                pickRandomObj(raws)[0],
                recipe,
                pickRandomObj(recipeTypes)[0],
            ),
        );
    }

    return createdProducts;
};

export const seedProducts = async (
    recipes: Recipe[],
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
): Promise<Product[]> => {
    return await main(recipes, recipeTypes, categories, raws)
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
