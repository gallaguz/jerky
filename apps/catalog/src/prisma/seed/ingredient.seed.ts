// import {
//     Ingredient,
//     IngredientForm,
//     PrismaClient,
// } from '@prisma/client/scripts/catalog-client';
// import * as crypto from 'crypto';
// import { faker } from '@faker-js/faker';
// import { IIngredient } from '@jerky/interfaces';
//
// const prismaClient = new PrismaClient();
//
// const ingredients: IIngredient[] = [
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Salt',
//         form: IngredientForm.SAND,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Salt Nitrite',
//         form: IngredientForm.SAND,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Red Hot Paper',
//         form: IngredientForm.POWDER,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Red Hot Paper',
//         form: IngredientForm.FLAKES,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Red Sweet Paper',
//         form: IngredientForm.POWDER,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Black Paper',
//         form: IngredientForm.POWDER,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Paprika',
//         form: IngredientForm.POWDER,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Coriander',
//         form: IngredientForm.SPLIT,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Soy Souse',
//         form: IngredientForm.LIQUOR,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Honey',
//         form: IngredientForm.VISCOUS,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Sugar',
//         form: IngredientForm.SAND,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Garlic',
//         form: IngredientForm.POWDER,
//         description: faker.commerce.productDescription(),
//         price: Math.floor(Math.random() * 100),
//     },
// ];
//
// const saveIngredient = async ({
//     uuid,
//     description,
//     form,
//     title,
//     price,
// }: IIngredient): Promise<Ingredient> => {
//     try {
//         return await prismaClient.ingredient.create({
//             data: {
//                 uuid,
//                 description,
//                 form,
//                 title,
//                 price,
//             },
//         });
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
// };
//
// const main = async (): Promise<Ingredient[]> => {
//     const createdIngredients: Ingredient[] = [];
//     for (const ingredient of ingredients) {
//         createdIngredients.push(await saveIngredient(ingredient));
//     }
//     return createdIngredients;
// };
//
// export const seedIngredients = async (): Promise<Ingredient[]> => {
//     return main()
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
//             console.log('--- Ingredient Seeded ---');
//         });
// };
