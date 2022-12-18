// import {
//     Category,
//     Ingredient,
//     IngredientForm,
//     IngredientQty,
//     PrismaClient,
//     Product,
//     Raw,
//     Recipe,
//     RecipeType,
// } from '@prisma/client/scripts/catalog-client';
// import * as crypto from 'crypto';
// import { faker } from '@faker-js/faker';
// import {
//     ICategory,
//     ICategoryProps,
//     IIngredient,
//     IIngredientDisconnect,
//     IIngredientQty,
//     IIngredientQtyProps,
//     IProduct,
//     IProductProps,
//     IRaw,
//     IRecipe,
//     IRecipeProps,
//     IRecipeType,
//     IRecipeTypeProps,
//     IUuid,
// } from '@jerky/interfaces';
// import { CategoryTester } from './category.tester';
// import { RecipeTypeTester } from './recipe.type.tester';
// import { IngredientTester } from './ingredient.tester';
// import { RawTester } from './raw.tester';
// import { RecipeTester } from './recipe.tester';
// import { IngredientQtyTester } from './ingredient.qty.tester';
// import { ProductTester } from './product.tester';
// import { Random } from '@jerky/common';
// import pickObj = Random.pickObj;
// import pickEnum = Random.pickKey;
// import pickNumber = Random.pickNumber;
//
// describe('Prisma Client', () => {
//     const prismaClient = new PrismaClient();
//
//     let categoryTester: CategoryTester;
//     let recipeTypeTester: RecipeTypeTester;
//     let ingredientTester: IngredientTester;
//     let ingredientQtyTester: IngredientQtyTester;
//     let rawTester: RawTester;
//     let recipeTester: RecipeTester;
//     let productTester: ProductTester;
//
//     it('[Prisma Client] Should be defined', function () {
//         expect(prismaClient).toBeDefined();
//     });
//     describe('[Catalog CRUD] test', () => {
//         describe('[Category]', () => {
//             const categories: Category[] = [];
//
//             beforeAll(async () => {
//                 categoryTester = new CategoryTester(prismaClient);
//             });
//
//             it('categoryTester should be defined', () => {
//                 expect(categoryTester).toBeDefined();
//             });
//             it('[create]', async () => {
//                 const props: ICategory = {
//                     uuid: crypto.randomUUID(),
//                     title: crypto.randomUUID(),
//                     description: crypto.randomUUID(),
//                 };
//                 const res = await categoryTester.saveModel(props);
//                 expect(res.uuid).toEqual(props.uuid);
//                 categories.push(res);
//             });
//             it('[findOne]', async () => {
//                 const uuid: string = pickObj(categories, 1)[0].uuid;
//                 const res = await categoryTester.findOneModel(uuid);
//                 expect(res).toBeTruthy();
//             });
//             it('[update]', async () => {
//                 const uuid: string = pickObj(categories, 1)[0].uuid;
//                 const title = crypto.randomUUID();
//                 const description = crypto.randomUUID();
//
//                 const props: ICategoryProps = {
//                     title,
//                     description,
//                 };
//                 const res = await categoryTester.updateModel(uuid, props);
//
//                 expect(res.title).toEqual(title);
//                 expect(res.description).toEqual(description);
//             });
//             it('[remove]', async () => {
//                 const props: ICategory = {
//                     uuid: crypto.randomUUID(),
//                     title: crypto.randomUUID(),
//                     description: crypto.randomUUID(),
//                 };
//                 const { uuid } = await categoryTester.saveModel(props);
//
//                 const res = await categoryTester.removeModel(uuid);
//                 expect(res.uuid).toEqual(uuid);
//             });
//             it('[clear db]', async () => {
//                 const tmp: Category[] = [];
//                 for (const { uuid } of categories) {
//                     const res = await categoryTester.removeModel(uuid);
//                     tmp.push(res);
//                 }
//                 expect(tmp.length).toEqual(categories.length);
//             });
//         });
//         describe('[Raw]', () => {
//             const raws: Raw[] = [];
//             const categories: Category[] = [];
//
//             beforeAll(async () => {
//                 rawTester = new RawTester(prismaClient);
//
//                 const res = await categoryTester.saveModel({
//                     uuid: crypto.randomUUID(),
//                     title: crypto.randomUUID(),
//                     description: crypto.randomUUID(),
//                 });
//                 categories.push(res);
//             });
//
//             afterAll(async () => {
//                 //
//             });
//
//             it('rawTester should be defined', async () => {
//                 expect(rawTester).toBeDefined();
//             });
//             it('[create]', async () => {
//                 const categoryUuid: string = pickObj(categories, 1)[0].uuid;
//                 const props: IRaw = {
//                     uuid: crypto.randomUUID(),
//                     title: crypto.randomUUID(),
//                     description: crypto.randomUUID(),
//                     price: Number(faker.commerce.price()),
//                 };
//                 const res = await rawTester.saveModel(props, categoryUuid);
//                 expect(res.uuid).toEqual(props.uuid);
//                 raws.push(res);
//             });
//             it('[findOne]', async () => {
//                 const uuid: string = pickObj(raws, 1)[0].uuid;
//                 const res = await rawTester.findOneModel(uuid);
//                 expect(res).toBeTruthy();
//             });
//             it('[update]', async () => {
//                 const categoryUuid: string = pickObj(categories, 1)[0].uuid;
//                 const uuid: string = pickObj(raws, 1)[0].uuid;
//                 const title = crypto.randomUUID();
//                 const description = crypto.randomUUID();
//                 const price = Number(faker.commerce.price());
//
//                 const props = {
//                     title,
//                     description,
//                     price,
//                 };
//
//                 const res = await rawTester.updateModel(
//                     uuid,
//                     props,
//                     categoryUuid,
//                 );
//
//                 expect(res.title).toEqual(title);
//                 expect(res.description).toEqual(description);
//                 expect(res.price).toEqual(price);
//             });
//             it('[remove]', async () => {
//                 const categoryUuid: string = pickObj(categories, 1)[0].uuid;
//                 const props: IRaw = {
//                     uuid: crypto.randomUUID(),
//                     title: crypto.randomUUID(),
//                     description: crypto.randomUUID(),
//                     price: Number(faker.commerce.price()),
//                 };
//                 const { uuid } = await rawTester.saveModel(props, categoryUuid);
//
//                 const res = await rawTester.removeModel(uuid);
//                 expect(res.uuid).toEqual(uuid);
//             });
//             it('[clear db]', async () => {
//                 const tmpCategories: Category[] = [];
//                 for (const { uuid } of categories) {
//                     const res = await categoryTester.removeModel(uuid);
//                     tmpCategories.push(res);
//                 }
//                 expect(tmpCategories.length).toEqual(categories.length);
//
//                 const tmpRaws: Raw[] = [];
//                 for (const { uuid } of raws) {
//                     const res = await rawTester.removeModel(uuid);
//                     tmpRaws.push(res);
//                 }
//                 expect(tmpRaws.length).toEqual(raws.length);
//             });
//         });
//         describe('[Ingredient]', () => {
//             const ingredients: Ingredient[] = [];
//             beforeAll(async () => {
//                 ingredientTester = new IngredientTester(prismaClient);
//             });
//
//             afterAll(async () => {
//                 //
//             });
//
//             it('ingredientTester should be defined', async () => {
//                 expect(ingredientTester).toBeDefined();
//             });
//             it('[create]', async () => {
//                 const props: IIngredient = {
//                     uuid: crypto.randomUUID(),
//                     title: crypto.randomUUID(),
//                     description: crypto.randomUUID(),
//                     form: pickEnum(IngredientForm),
//                     price: Number(faker.commerce.price()),
//                 };
//                 const res = await ingredientTester.saveModel(props);
//                 expect(res.uuid).toEqual(props.uuid);
//                 ingredients.push(res);
//             });
//             it('[findOne]', async () => {
//                 const uuid: string = pickObj(ingredients, 1)[0].uuid;
//                 const res = await ingredientTester.findOneModel(uuid);
//                 expect(res).toBeTruthy();
//             });
//             it('[update]', async () => {
//                 const uuid: string = pickObj(ingredients, 1)[0].uuid;
//                 const title = faker.commerce.productName();
//                 const description = faker.commerce.productDescription();
//                 const form = IngredientForm.FLAKES;
//                 const price = Number(faker.commerce.price());
//
//                 const res = await ingredientTester.updateModel(uuid, {
//                     title,
//                     description,
//                     form,
//                     price,
//                 });
//                 expect(res.uuid).toEqual(uuid);
//                 expect(res.title).toEqual(title);
//                 expect(res.description).toEqual(description);
//                 expect(res.form).toEqual(form);
//                 expect(res.price).toEqual(price);
//             });
//             it('[remove]', async () => {
//                 const props: IIngredient = {
//                     uuid: crypto.randomUUID(),
//                     title: crypto.randomUUID(),
//                     description: crypto.randomUUID(),
//                     form: pickEnum(IngredientForm),
//                     price: Number(faker.commerce.price()),
//                 };
//                 const { uuid } = await ingredientTester.saveModel(props);
//
//                 const res = await ingredientTester.removeModel(uuid);
//                 expect(res.uuid).toEqual(uuid);
//             });
//             it('[clear db]', async () => {
//                 const tmp: Ingredient[] = [];
//                 for (const { uuid } of ingredients) {
//                     const res = await ingredientTester.removeModel(uuid);
//                     tmp.push(res);
//                 }
//                 expect(tmp.length).toEqual(ingredients.length);
//             });
//         });
//         describe('[IngredientQty]', () => {
//             const ingredientQty: IIngredientQty = {
//                 uuid: crypto.randomUUID(),
//                 qtyPerKg: pickNumber(),
//             };
//             const ingredients: Ingredient[] = [];
//
//             beforeAll(async () => {
//                 ingredientQtyTester = new IngredientQtyTester(prismaClient);
//
//                 for (let i = 0; i < 10; i++) {
//                     const props: IIngredient = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                         form: pickEnum(IngredientForm),
//                         price: Number(faker.commerce.price()),
//                     };
//                     const res = await ingredientTester.saveModel(props);
//                     ingredients.push(res);
//                 }
//             });
//             it('ingredientQtyTester should be defined', async () => {
//                 expect(ingredientQtyTester).toBeDefined();
//             });
//             it('[create]', async () => {
//                 const ingredientUuid = ingredients[0].uuid;
//                 const res = await ingredientQtyTester.saveModel(
//                     ingredientQty,
//                     ingredientUuid,
//                 );
//                 expect(res.uuid).toEqual(ingredientQty.uuid);
//             });
//             it('[findOne]', async () => {
//                 const res = await ingredientQtyTester.findOneModel(
//                     ingredientQty.uuid,
//                 );
//                 expect(res).toBeTruthy();
//             });
//             it('[update]', async () => {
//                 const props: IIngredientQtyProps = {
//                     qtyPerKg: 42,
//                 };
//                 const disconnect: IIngredientDisconnect = {
//                     disconnect: { uuid: ingredients[0].uuid },
//                 };
//                 const res = await ingredientQtyTester.updateModel(
//                     ingredientQty.uuid,
//                     props,
//                     disconnect,
//                 );
//                 expect(res.qtyPerKg).toEqual(42);
//             });
//             it('[remove]', async () => {
//                 const res = await ingredientQtyTester.removeModel(
//                     ingredientQty.uuid,
//                 );
//                 expect(res.uuid).toEqual(ingredientQty.uuid);
//             });
//             it('[clear db]', async () => {
//                 const tmp: Ingredient[] = [];
//                 for (const { uuid } of ingredients) {
//                     const res = await ingredientTester.removeModel(uuid);
//                     tmp.push(res);
//                 }
//                 expect(tmp.length).toEqual(ingredients.length);
//             });
//         });
//         describe('[RecipeType]', () => {
//             const recipeTypes: RecipeType[] = [];
//
//             beforeAll(async () => {
//                 recipeTypeTester = new RecipeTypeTester(prismaClient);
//             });
//             it('recipeTypeTester should be defined', async () => {
//                 expect(recipeTypeTester).toBeDefined();
//             });
//             it('[create]', async () => {
//                 const uuid: string = crypto.randomUUID();
//                 const title: string = crypto.randomUUID();
//                 const description: string = crypto.randomUUID();
//                 const props: IRecipeType = {
//                     uuid,
//                     title,
//                     description,
//                 };
//                 const res = await recipeTypeTester.saveModel(props);
//                 expect(res.uuid).toEqual(uuid);
//                 expect(res.title).toEqual(title);
//                 expect(res.description).toEqual(description);
//                 recipeTypes.push(res);
//             });
//             it('[findOne]', async () => {
//                 const uuid: string = pickObj(recipeTypes)[0].uuid;
//                 const res = await recipeTypeTester.findOneModel(uuid);
//                 expect(res).toBeTruthy();
//             });
//             it('[update]', async () => {
//                 const uuid: string = pickObj(recipeTypes)[0].uuid;
//                 const title: string = crypto.randomUUID();
//                 const description: string = crypto.randomUUID();
//                 const props: IRecipeTypeProps = {
//                     title,
//                     description,
//                 };
//                 const res = await recipeTypeTester.updateModel(uuid, props);
//                 expect(res.uuid).toEqual(uuid);
//                 expect(res.title).toEqual(title);
//                 expect(res.description).toEqual(description);
//             });
//             it('[remove]', async () => {
//                 const uuid: string = pickObj(recipeTypes)[0].uuid;
//                 const res = await recipeTypeTester.removeModel(uuid);
//                 expect(res.uuid).toEqual(uuid);
//             });
//         });
//         describe('[Recipe]', () => {
//             const categories: Category[] = [];
//             const recipeTypes: RecipeType[] = [];
//             const raws: Raw[] = [];
//             const ingredients: Ingredient[] = [];
//             const ingredientQtys: IngredientQty[] = [];
//             let recipe: Recipe;
//
//             beforeAll(async () => {
//                 recipeTester = new RecipeTester(prismaClient);
//
//                 for (let i = 0; i < 10; i++) {
//                     const props: ICategory = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                     };
//                     categories.push(await categoryTester.saveModel(props));
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const props: IRecipeType = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                     };
//                     recipeTypes.push(await recipeTypeTester.saveModel(props));
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const props: IRaw = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                         price: Number(faker.commerce.price()),
//                     };
//                     const categoryUuid: string = pickObj(categories)[0].uuid;
//
//                     raws.push(await rawTester.saveModel(props, categoryUuid));
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const props: IIngredient = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                         price: Number(faker.commerce.price()),
//                     };
//
//                     ingredients.push(await ingredientTester.saveModel(props));
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const ingredientUuid = pickObj(ingredients)[0].uuid;
//                     const props: IIngredientQty = {
//                         uuid: crypto.randomUUID(),
//                         qtyPerKg: pickNumber(),
//                     };
//                     ingredientQtys.push(
//                         await ingredientQtyTester.saveModel(
//                             props,
//                             ingredientUuid,
//                         ),
//                     );
//                 }
//             });
//             it('recipeTester should be defined', async () => {
//                 expect(recipeTester).toBeDefined();
//             });
//             it('[create]', async () => {
//                 const recipeTypeUuid: string = pickObj(recipeTypes)[0].uuid;
//                 const categoryUuid: string = pickObj(categories)[0].uuid;
//                 const rawUuid: string = pickObj(raws)[0].uuid;
//
//                 const props: IRecipe = {
//                     uuid: crypto.randomUUID(),
//                     title: crypto.randomUUID(),
//                     description: crypto.randomUUID(),
//                     recipeTypeUuid,
//                     categoryUuid,
//                     rawUuid,
//                 };
//                 const ingredientQtyUuids: IUuid[] = ingredientQtys.map((el) => {
//                     return {
//                         uuid: el.uuid,
//                     };
//                 });
//
//                 const res = await recipeTester.saveModel(
//                     props,
//                     ingredientQtyUuids,
//                 );
//                 expect(res.recipeTypeUuid).toEqual(recipeTypeUuid);
//                 expect(res.categoryUuid).toEqual(categoryUuid);
//                 expect(res.rawUuid).toEqual(rawUuid);
//
//                 recipe = res;
//             });
//             it('[findOne]', async () => {
//                 const res = await recipeTester.findOneModel(recipe.uuid);
//                 expect(res).toBeTruthy();
//             });
//             it('[update]', async () => {
//                 const description = crypto.randomUUID();
//                 const ingredientQtyUuids: IUuid[] = ingredientQtys.map(
//                     (el) => ({
//                         uuid: el.uuid,
//                     }),
//                 );
//                 const disconnect: IIngredientDisconnect = {
//                     disconnect: ingredientQtyUuids,
//                 };
//                 const props: IRecipeProps = {
//                     description,
//                 };
//                 const res = await recipeTester.updateModel(
//                     recipe.uuid,
//                     props,
//                     disconnect,
//                 );
//                 expect(res.description).toEqual(description);
//             });
//             it('[remove]', async () => {
//                 const res = await recipeTester.removeModel(recipe.uuid);
//                 expect(res.uuid).toEqual(recipe.uuid);
//             });
//         });
//         describe('[Product]', () => {
//             const categories: Category[] = [];
//             const recipeTypes: RecipeType[] = [];
//             const raws: Raw[] = [];
//             const ingredients: Ingredient[] = [];
//             const ingredientQtys: IngredientQty[] = [];
//             const recipes: Recipe[] = [];
//             const products: Product[] = [];
//
//             beforeAll(async () => {
//                 productTester = new ProductTester(prismaClient);
//
//                 for (let i = 0; i < 10; i++) {
//                     const props: ICategory = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                     };
//                     categories.push(await categoryTester.saveModel(props));
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const props: IRecipeType = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                     };
//                     recipeTypes.push(await recipeTypeTester.saveModel(props));
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const props: IRaw = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                         price: Number(faker.commerce.price()),
//                     };
//                     const categoryUuid: string = pickObj(categories)[0].uuid;
//
//                     raws.push(await rawTester.saveModel(props, categoryUuid));
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const props: IIngredient = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                         price: Number(faker.commerce.price()),
//                     };
//
//                     ingredients.push(await ingredientTester.saveModel(props));
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const ingredientUuid = pickObj(ingredients)[0].uuid;
//                     const props: IIngredientQty = {
//                         uuid: crypto.randomUUID(),
//                         qtyPerKg: pickNumber(),
//                     };
//                     ingredientQtys.push(
//                         await ingredientQtyTester.saveModel(
//                             props,
//                             ingredientUuid,
//                         ),
//                     );
//                 }
//                 for (let i = 0; i < 10; i++) {
//                     const recipeTypeUuid: string = pickObj(recipeTypes)[0].uuid;
//                     const categoryUuid: string = pickObj(categories)[0].uuid;
//                     const rawUuid: string = pickObj(raws)[0].uuid;
//
//                     const props: IRecipe = {
//                         uuid: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                         recipeTypeUuid,
//                         categoryUuid,
//                         rawUuid,
//                     };
//                     const ingredientQtyUuids: IUuid[] = ingredientQtys.map(
//                         (el) => {
//                             return {
//                                 uuid: el.uuid,
//                             };
//                         },
//                     );
//
//                     const res = await recipeTester.saveModel(
//                         props,
//                         ingredientQtyUuids,
//                     );
//                     recipes.push(res);
//                 }
//             });
//
//             afterAll(async () => {
//                 //
//             });
//
//             it('productTester should be defined', async () => {
//                 expect(productTester).toBeDefined();
//             });
//             it('[create]', async () => {
//                 const uuid: string = crypto.randomUUID();
//                 const title: string = crypto.randomUUID();
//                 const description: string = crypto.randomUUID();
//                 const price = Number(faker.commerce.price());
//                 const categoryUuid: string = pickObj(categories, 1)[0].uuid;
//                 const rawUuid: string = pickObj(raws, 1)[0].uuid;
//                 const recipeUuid: string = pickObj(recipes, 1)[0].uuid;
//                 const recipeTypeUuid: string = pickObj(recipeTypes, 1)[0].uuid;
//                 const props: IProduct = {
//                     uuid,
//                     price,
//                     title,
//                     recipeUuid,
//                     recipeTypeUuid,
//                     categoryUuid,
//                     rawUuid,
//                     description,
//                 };
//                 const res = await productTester.saveModel(props);
//                 expect(res.uuid).toEqual(uuid);
//                 expect(res.title).toEqual(title);
//                 expect(res.description).toEqual(description);
//                 expect(res.categoryUuid).toEqual(categoryUuid);
//                 expect(res.rawUuid).toEqual(rawUuid);
//                 expect(res.recipeUuid).toEqual(recipeUuid);
//                 expect(res.recipeTypeUuid).toEqual(recipeTypeUuid);
//                 products.push(res);
//             });
//             it('[findOne]', async () => {
//                 const res = await productTester.findOneModel(products[0].uuid);
//                 expect(res).toBeTruthy();
//             });
//             it('[update]', async () => {
//                 const uuid: string = pickObj(products)[0].uuid;
//                 const title: string = crypto.randomUUID();
//                 const description: string = crypto.randomUUID();
//                 const price = Number(faker.commerce.price());
//                 const props: IProductProps = {
//                     price,
//                     title,
//                     description,
//                 };
//                 const res = await productTester.updateModel(uuid, props);
//                 expect(res.uuid).toEqual(uuid);
//                 expect(res.title).toEqual(title);
//                 expect(res.description).toEqual(description);
//                 expect(res.price).toEqual(price);
//             });
//             it('[remove]', async () => {
//                 const uuid: string = pickObj(products)[0].uuid;
//                 const res = await productTester.removeModel(uuid);
//                 expect(res.uuid).toEqual(uuid);
//             });
//         });
//     });
// });
