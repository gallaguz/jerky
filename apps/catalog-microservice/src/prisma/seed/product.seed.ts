import {
    Category,
    Prisma,
    PrismaClient,
    Product,
    Raw,
    RawType,
    Recipe,
    RecipeType,
} from '@prisma/client/scripts/catalog-client';
import ProductCreateInput = Prisma.ProductCreateInput;
import * as crypto from 'crypto';
import * as process from 'process';
import * as slug from 'slug';

import { pickObj } from './common/helper';

const prismaClient = new PrismaClient();

const main = async (
    recipes: Recipe[],
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
    rawTypes: RawType[],
): Promise<Product[]> => {
    const createdProducts: Product[] = [];

    for (const recipe of recipes) {
        const recipeType = pickObj(recipeTypes, 1)[0];
        const category = pickObj(categories, 1)[0];
        const raw = pickObj(raws, 1)[0];
        const rawType = pickObj(rawTypes, 1)[0];

        const title =
            `${recipeType.title} ${raw.title} ${category.title} ` +
            crypto.randomUUID();

        const data: ProductCreateInput = {
            alias: slug(title),
            title: title,
            description: recipe.description,
            price: 9,
            recipe: {
                connect: {
                    uuid: recipe.uuid,
                },
            },
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
            rawType: {
                connect: {
                    uuid: rawType.uuid,
                },
            },
            recipeType: {
                connect: {
                    uuid: recipeType.uuid,
                },
            },
        };
        createdProducts.push(await prismaClient.product.create({ data }));
    }

    return createdProducts;
};

export const seedProducts = async (
    recipes: Recipe[],
    recipeTypes: RecipeType[],
    categories: Category[],
    raws: Raw[],
    rawTypes: RawType[],
): Promise<Product[]> => {
    const start = performance.now();

    return await main(recipes, recipeTypes, categories, raws, rawTypes)
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        })
        .finally(async () => {
            await prismaClient.$disconnect().then(() => {
                const end = Math.floor(performance.now() - start);
                console.log(`--- Product Seeded in ${end} ms ---`);
            });
        });
};
