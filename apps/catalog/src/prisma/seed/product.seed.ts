// import {
//     Category,
//     PrismaClient,
//     Product,
//     Raw,
//     Recipe,
//     RecipeType,
// } from '@prisma/client/scripts/catalog-client';
// import * as crypto from 'crypto';
// import { IUuid } from '@jerky/interfaces';
// import { pickNumber, pickObj } from './helper';
//
// const prismaClient = new PrismaClient();
//
// export interface ICategoryConnect {
//     connect: IUuid;
// }
//
// export interface IRawConnect {
//     connect: IUuid;
// }
//
// export interface IRecipeConnect {
//     connect: IUuid;
// }
//
// export interface IRecipeTypeConnect {
//     connect: IUuid;
// }
//
// const saveProduct = async (
//     category: Category,
//     raw: Raw,
//     recipe: Recipe,
//     recipeType: RecipeType,
// ): Promise<Product> => {
//     return prismaClient.product.create({
//         data: {
//             uuid: crypto.randomUUID(),
//             title: recipe.title,
//             description: recipe.description,
//             price: pickNumber(),
//             categoryUuid: category.uuid,
//             rawUuid: raw.uuid,
//             recipeUuid: recipe.uuid,
//             recipeTypeUuid: recipeType.uuid,
//         },
//     });
// };
//
// const main = async (
//     recipes: Recipe[],
//     recipeTypes: RecipeType[],
//     categories: Category[],
//     raws: Raw[],
// ): Promise<Product[]> => {
//     const createdProducts: Product[] = [];
//
//     for (const recipe of recipes) {
//         createdProducts.push(
//             await saveProduct(
//                 pickObj(categories)[0],
//                 pickObj(raws)[0],
//                 recipe,
//                 pickObj(recipeTypes)[0],
//             ),
//         );
//     }
//
//     return createdProducts;
// };
//
// export const seedProducts = async (
//     recipes: Recipe[],
//     recipeTypes: RecipeType[],
//     categories: Category[],
//     raws: Raw[],
// ): Promise<Product[]> => {
//     return await main(recipes, recipeTypes, categories, raws)
//         .then(async (res) => {
//             await prismaClient.$disconnect();
//             // console.log(res);
//             return res;
//         })
//         .catch(async (e) => {
//             console.error(e);
//             await prismaClient.$disconnect();
//             process.exit(1);
//         })
//         .finally(() => {
//             console.log('--- Product Seeded ---');
//         });
// };
