// import {
//     Category,
//     Ingredient,
//     PrismaClient,
//     Raw,
//     Recipe,
//     RecipeType,
// } from '@prisma/client/scripts/catalog-client';
// import * as crypto from 'crypto';
// import { faker } from '@faker-js/faker';
// import { IIngredientQty, IRecipe } from '@jerky/interfaces';
// import { pickNumber, pickNumberInRange, pickObj } from './helper';
//
// const prismaClient = new PrismaClient();
//
// const saveRecipe = async (
//     {
//         uuid,
//         description,
//         title,
//         recipeTypeUuid,
//         categoryUuid,
//         rawUuid,
//     }: IRecipe,
//     ingredientsQty: IIngredientQty[],
// ): Promise<Recipe> => {
//     return await prismaClient.recipe
//         .create({
//             data: {
//                 uuid,
//                 title,
//                 description,
//                 recipeTypeUuid,
//                 categoryUuid,
//                 rawUuid,
//                 ingredientQty: {
//                     create: <IIngredientQty[]>ingredientsQty,
//                 },
//             },
//         })
//         .catch((e) => {
//             console.log(e);
//             throw e;
//         });
// };
//
// const main = async (
//     recipeTypes: RecipeType[],
//     categories: Category[],
//     raws: Raw[],
//     ingredients: Ingredient[],
// ): Promise<Recipe[]> => {
//     const createdRecipes: Recipe[] = [];
//     const randomNumber = pickNumber();
//
//     for (
//         let i = 0;
//         i < pickNumberInRange(randomNumber, randomNumber * 2);
//         i++
//     ) {
//         const recipeType =
//             recipeTypes[pickNumberInRange(0, recipeTypes.length - 1)];
//         const category =
//             categories[pickNumberInRange(0, categories.length - 1)];
//         const raw = raws[pickNumberInRange(0, raws.length - 1)];
//
//         const ingredientsUuids = pickObj(
//             ingredients,
//             pickNumberInRange(3, 10),
//         ).map((ingredient) => ({
//             uuid: ingredient.uuid,
//         }));
//
//         const ingredientsQty = ingredientsUuids.map((el) => {
//             return {
//                 uuid: crypto.randomUUID(),
//                 qtyPerKg: Math.floor(Math.random() * 100),
//                 ingredient: {
//                     connect: { uuid: el.uuid },
//                 },
//             };
//         });
//
//         const recipe = {
//             uuid: crypto.randomUUID(),
//             title: `${raw.title} ${recipeType.title} ${category.title}`,
//             description: faker.commerce.productDescription(),
//             recipeTypeUuid: recipeType.uuid,
//             categoryUuid: category.uuid,
//             rawUuid: raw.uuid,
//             ingredientsQty,
//         };
//
//         createdRecipes.push(await saveRecipe(recipe, ingredientsQty));
//     }
//     return createdRecipes;
// };
//
// export const seedRecipes = async (
//     recipeTypes: RecipeType[],
//     categories: Category[],
//     raws: Raw[],
//     ingredients: Ingredient[],
// ): Promise<Recipe[]> => {
//     return await main(recipeTypes, categories, raws, ingredients)
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
//         .finally(async () => {
//             await prismaClient.$disconnect();
//             console.log('--- Recipe Seeded ---');
//         });
// };
//
// // const recipes = [
// //     {
// //         uuid: crypto.randomUUID(),
// //         title: 'Salty',
// //         description: 'Clear taste',
// //     },
// //     {
// //         uuid: crypto.randomUUID(),
// //         title: 'Spicy',
// //         description: 'If your life boring',
// //     },
// //     {
// //         uuid: crypto.randomUUID(),
// //         title: 'Spicy BH',
// //         description: 'Feel new concept (But Hurt)',
// //     },
// //     {
// //         uuid: crypto.randomUUID(),
// //         title: 'Spicy HD',
// //         description: 'If your life boring (Hole Destroyer)',
// //     },
// //     {
// //         uuid: crypto.randomUUID(),
// //         title: 'Marinated Simple',
// //         description: 'Some taste from chief',
// //     },
// //     {
// //         uuid: crypto.randomUUID(),
// //         title: 'Marinated Special',
// //         description: 'If you want something special',
// //     },
// //     {
// //         uuid: crypto.randomUUID(),
// //         title: 'Marinated BBQ',
// //         description: 'Simple BBQ flavor',
// //     },
// // ];
