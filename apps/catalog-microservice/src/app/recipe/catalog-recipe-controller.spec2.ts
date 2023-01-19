// import { Random } from '@jerky/common';
// import {
//     InternalCategoryCreateCommandContract,
//     InternalIngredientCreateCommandContract,
//     InternalProductCreateCommandContract,
//     InternalRawCreateCommandContract,
//     InternalRawTypeCreateCommandContract,
//     InternalRecipeCreateCommandContract,
//     InternalRecipeFindManyQueryContract,
//     InternalRecipeFindOneTitleQueryContract,
//     InternalRecipeFindOneUuidQueryContract,
//     InternalRecipeRemoveCommandContract,
//     InternalRecipeTypeCreateCommandContract,
//     InternalRecipeUpdateCommandContract,
// } from '@jerky/contracts';
// import { TRecipeWithRelations } from '@jerky/interfaces';
// import { ConfigModule } from '@nestjs/config';
// import { NestApplication } from '@nestjs/core';
// import { Test, TestingModule } from '@nestjs/testing';
// import {
//     Category,
//     Ingredient,
//     Product,
//     Raw,
//     RawType,
//     Recipe,
//     RecipeType,
// } from '@prisma/client/scripts/catalog-client';
// import * as crypto from 'crypto';
// import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
//
// import { EnvConfig } from '../../config/env.config';
// import { DatabaseModule } from '../../database/database.module';
// import { CategoryController } from '../category/category.controller';
// import { ApiCategoryModule } from '../category/category.module';
// import { IngredientController } from '../ingredient/ingredient.controller';
// import { IngredientModule } from '../ingredient/ingredient.module';
// import { ProductController } from '../product/product.controller';
// import { ProductModule } from '../product/product.module';
// import { RawTypeController } from '../raw.type/raw.type.controller';
// import { RawTypeModule } from '../raw.type/raw.type.module';
// import { RawController } from '../raw/raw.controller';
// import { RawModule } from '../raw/raw.module';
// import { RecipeTypeController } from '../recipe.type/recipe.type.controller';
// import { RecipeTypeModule } from '../recipe.type/recipe.type.module';
// import { RecipeController } from './recipe.controller';
// import { RecipeModule } from './recipe.module';
//
// describe(`[ Recipe Controller ]`, () => {
//     let app: NestApplication;
//     let recipeController: RecipeController;
//     let recipeTypeController: RecipeTypeController;
//     let categoryController: CategoryController;
//     let ingredientController: IngredientController;
//     let rawController: RawController;
//     let rawTypeController: RawTypeController;
//     let productController: ProductController;
//     let rmqTestService: RMQTestService;
//
//     beforeAll(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             imports: [
//                 ConfigModule.forRoot(EnvConfig()),
//                 RMQModule.forTest({}),
//                 DatabaseModule,
//                 ApiCategoryModule,
//                 ProductModule,
//                 IngredientModule,
//                 RecipeModule,
//                 RecipeTypeModule,
//                 RawModule,
//                 RawTypeModule,
//             ],
//         }).compile();
//
//         app = module.createNestApplication();
//
//         recipeController = app.get<RecipeController>(RecipeController);
//         recipeTypeController =
//             app.get<RecipeTypeController>(RecipeTypeController);
//         categoryController = app.get<CategoryController>(CategoryController);
//         ingredientController =
//             app.get<IngredientController>(IngredientController);
//         productController = app.get<ProductController>(ProductController);
//         rawController = app.get<RawController>(RawController);
//         rawTypeController = app.get<RawTypeController>(RawTypeController);
//
//         rmqTestService = app.get(RMQService);
//
//         await app.init();
//     });
//
//     afterAll(async () => {
//         await app.close();
//     });
//
//     describe(`[ RMQ ] CRUD`, () => {
//         const recipes: Recipe[] = [];
//         const recipeTypes: RecipeType[] = [];
//         const categories: Category[] = [];
//         const raws: Raw[] = [];
//         const rawTypes: RawType[] = [];
//         const ingredients: Ingredient[] = [];
//         const products: Product[] = [];
//
//         const createCategory = async (): Promise<Category> => {
//             const props: InternalCategoryCreateCommandContract.Request = {
//                 alias: crypto.randomUUID(),
//                 title: crypto.randomUUID(),
//                 description: crypto.randomUUID(),
//             };
//             return await categoryController.create(props);
//         };
//         const createRaw = async (): Promise<Raw> => {
//             const props: InternalRawCreateCommandContract.Request = {
//                 alias: crypto.randomUUID(),
//                 title: crypto.randomUUID(),
//                 description: crypto.randomUUID(),
//                 price: Random.pickNumber(),
//                 payload: Math.random(),
//             };
//             return await rawController.create(props);
//         };
//         const createRawType = async (): Promise<RawType> => {
//             const props: InternalRawTypeCreateCommandContract.Request = {
//                 alias: crypto.randomUUID(),
//                 title: crypto.randomUUID(),
//                 description: crypto.randomUUID(),
//             };
//             return await rawTypeController.create(props);
//         };
//         const createRecipeType = async (): Promise<RecipeType> => {
//             const props: InternalRecipeTypeCreateCommandContract.Request = {
//                 alias: crypto.randomUUID(),
//                 title: crypto.randomUUID(),
//                 description: crypto.randomUUID(),
//             };
//             return await recipeTypeController.create(props);
//         };
//         const createIngredient = async (): Promise<Ingredient> => {
//             const props: InternalIngredientCreateCommandContract.Request = {
//                 alias: crypto.randomUUID(),
//                 title: crypto.randomUUID(),
//                 description: crypto.randomUUID(),
//                 price: Random.pickNumber(),
//                 type: crypto.randomUUID(),
//                 payload: Math.random(),
//             };
//             return await ingredientController.create(props);
//         };
//         const createRecipe = async (): Promise<Recipe> => {
//             const tmpProps: InternalRecipeCreateCommandContract.Request = {
//                 alias: crypto.randomUUID(),
//                 title: crypto.randomUUID(),
//                 description: crypto.randomUUID(),
//             };
//
//             return await recipeController.create(tmpProps);
//         };
//         const createProduct = async (): Promise<Product> => {
//             const props: InternalProductCreateCommandContract.Request = {
//                 alias: crypto.randomUUID(),
//                 title: crypto.randomUUID(),
//                 description: crypto.randomUUID(),
//                 price: Random.pickNumber(),
//             };
//             return await productController.create(props);
//         };
//
//         const removeCategory = async (uuid: string): Promise<Category> => {
//             return categoryController.remove({ uuid });
//         };
//         const removeRaw = async (uuid: string): Promise<Raw> => {
//             return await rawController.remove({ uuid });
//         };
//         const removeRawType = async (uuid: string): Promise<RawType> => {
//             return rawTypeController.remove({ uuid });
//         };
//         const removeRecipeType = async (uuid: string): Promise<RawType> => {
//             return recipeTypeController.remove({ uuid });
//         };
//         const removeIngredient = async (uuid: string): Promise<Ingredient> => {
//             return ingredientController.remove({ uuid });
//         };
//         const removeRecipe = async (uuid: string): Promise<Recipe> => {
//             return recipeController.remove({ uuid });
//         };
//         const removeProduct = async (uuid: string): Promise<Product> => {
//             return await productController.remove({ uuid });
//         };
//
//         // TODO Add Relation types to all models
//
//         beforeAll(async () => {
//             for (let i = 0; i < 10; i++) {
//                 categories.push(await createCategory());
//                 ingredients.push(await createIngredient());
//                 raws.push(await createRaw());
//                 rawTypes.push(await createRawType());
//                 recipeTypes.push(await createRecipeType());
//                 products.push(await createProduct());
//             }
//         });
//
//         it('[ app ] toBeDefined', function () {
//             expect(app).toBeDefined();
//         });
//
//         it('[ recipeController ] toBeDefined - success', function () {
//             expect(recipeController).toBeDefined();
//         });
//         it('[ recipeTypeController ] toBeDefined - success', function () {
//             expect(recipeTypeController).toBeDefined();
//         });
//         it('[ categoryController ] toBeDefined - success', function () {
//             expect(categoryController).toBeDefined();
//         });
//         it('[ ingredientController ] toBeDefined - success', function () {
//             expect(ingredientController).toBeDefined();
//         });
//         it('[ productController ] toBeDefined - success', function () {
//             expect(productController).toBeDefined();
//         });
//         it('[ rawController ] toBeDefined - success', function () {
//             expect(rawController).toBeDefined();
//         });
//         it('[ rawTypeController ] toBeDefined - success', function () {
//             expect(rawTypeController).toBeDefined();
//         });
//
//         describe('[ C ]', () => {
//             describe(`Create - (${InternalRecipeCreateCommandContract.topic})`, () => {
//                 it(`correct props - expect success`, async () => {
//                     const props: InternalRecipeCreateCommandContract.Request = {
//                         alias: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                     };
//
//                     const res: Recipe = await rmqTestService.triggerRoute<
//                         InternalRecipeCreateCommandContract.Request,
//                         InternalRecipeCreateCommandContract.Response
//                     >(InternalRecipeCreateCommandContract.topic, props);
//
//                     expect(res.title).toEqual(props.title);
//                     expect(res.alias).toEqual(props.alias);
//                     expect(res.description).toEqual(props.description);
//
//                     recipes.push(res);
//                 });
//             });
//
//             describe(`Validation - (${InternalRecipeCreateCommandContract.topic})`, () => {
//                 it(`duplicate title - expect ConflictException`, async () => {
//                     //
//                 });
//                 it(`empty props - expect BadRequestException`, async () => {
//                     //
//                 });
//                 it(`to short title - expect RMQError`, async () => {
//                     //
//                 });
//                 it(`to long title - expect RMQError`, async () => {
//                     //
//                 });
//                 it(`not valid title - expect  RMQError`, async () => {
//                     //
//                 });
//                 it(`not valid description - expect RMQError`, async () => {
//                     //
//                 });
//             });
//         });
//
//         describe('[ R ]', () => {
//             describe(`Find One`, () => {
//                 describe(`(${InternalRecipeFindOneUuidQueryContract.topic}`, () => {
//                     it(`correct uuid - success`, async () => {
//                         //
//                     });
//                 });
//                 describe(`${InternalRecipeFindOneTitleQueryContract.topic}`, () => {
//                     it(`correct title - success`, async () => {
//                         //
//                     });
//                 });
//
//                 describe(`Validation - (${InternalRecipeFindOneUuidQueryContract.topic})`, () => {
//                     it(`wrong uuid - expect NotFoundException`, async () => {
//                         //
//                     });
//                     it(`not valid uuid - expect RMQError`, async () => {
//                         //
//                     });
//                 });
//             });
//             describe(`Find Filtered - (${InternalRecipeFindManyQueryContract.topic})`, () => {
//                 it(`correct props - expect success`, async () => {
//                     //
//                 });
//                 describe(`Validation - (${InternalRecipeFindManyQueryContract.topic})`, () => {
//                     it(`not valid "take" (string) - expect - RMQError`, async () => {
//                         //
//                     });
//                     it(`not valid "skip" (string) - expect - RMQError`, async () => {
//                         //
//                     });
//                     it(`not valid "orderBy" - expect - RMQError`, async () => {
//                         //
//                     });
//                     it(`not valid "searchString" - expect RMQError`, async () => {
//                         //
//                     });
//                 });
//             });
//         });
//
//         describe('[ U ]', () => {
//             describe(`Update - (${InternalRecipeUpdateCommandContract.topic})`, () => {
//                 beforeEach(async () => {
//                     recipes.push(await createRecipe());
//                 });
//                 it(`correct props - expect success`, async () => {
//                     const props: InternalRecipeUpdateCommandContract.Request = {
//                         uuid: recipes[recipes.length - 1].uuid,
//                         alias: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                     };
//
//                     const updated: Recipe = await rmqTestService.triggerRoute<
//                         InternalRecipeUpdateCommandContract.Request,
//                         InternalRecipeUpdateCommandContract.Response
//                     >(InternalRecipeUpdateCommandContract.topic, props);
//
//                     expect(updated.uuid).toEqual(props.uuid);
//                     expect(updated.alias).toEqual(props.alias);
//                     expect(updated.title).toEqual(props.title);
//                     expect(updated.description).toEqual(props.description);
//                 });
//                 it(`connect: correct props - expect success`, async () => {
//                     const categoriesUuidPool = categories.map((category) => {
//                         return { uuid: category.uuid };
//                     });
//
//                     const props: InternalRecipeUpdateCommandContract.Request = {
//                         uuid: recipes[recipes.length - 1].uuid,
//                         alias: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                         category: {
//                             connect: categoriesUuidPool,
//                         },
//                     };
//
//                     await rmqTestService
//                         .triggerRoute<
//                             InternalRecipeUpdateCommandContract.Request,
//                             InternalRecipeUpdateCommandContract.Response
//                         >(InternalRecipeUpdateCommandContract.topic, props)
//                         .then((updated) => {
//                             expect(updated.uuid).toEqual(props.uuid);
//                             expect(updated.category?.length).toEqual(
//                                 categories.length,
//                             );
//                         })
//                         .finally(() => {
//                             recipeController.update({
//                                 uuid: props.uuid,
//                                 category: {
//                                     disconnect: categoriesUuidPool,
//                                 },
//                             });
//                         });
//                 });
//
//                 it(`disconnect: correct props - expect success`, async () => {
//                     const disconnect = categories.map((category) => {
//                         return { uuid: category.uuid };
//                     });
//
//                     const props: InternalRecipeUpdateCommandContract.Request = {
//                         uuid: recipes[recipes.length - 1].uuid,
//                         alias: crypto.randomUUID(),
//                         title: crypto.randomUUID(),
//                         description: crypto.randomUUID(),
//                         category: {
//                             disconnect,
//                         },
//                     };
//
//                     const updated: Recipe = await rmqTestService.triggerRoute<
//                         InternalRecipeUpdateCommandContract.Request,
//                         InternalRecipeUpdateCommandContract.Response
//                     >(InternalRecipeUpdateCommandContract.topic, props);
//
//                     expect(updated.uuid).toEqual(props.uuid);
//                 });
//
//                 describe(`[ IngredientCoefficient CRUD ]`, () => {
//                     it(`create: correct props - expect success`, async () => {
//                         const create = ingredients.map((ingredient) => {
//                             return {
//                                 coefficient: Random.pickNumber(),
//                                 ingredientUuid: ingredient.uuid,
//                             };
//                         });
//
//                         const props: InternalRecipeUpdateCommandContract.Request =
//                             {
//                                 uuid: recipes[recipes.length - 1].uuid,
//                                 ingredientCoefficient: { create },
//                             };
//
//                         const updated: TRecipeWithRelations =
//                             await rmqTestService.triggerRoute<
//                                 InternalRecipeUpdateCommandContract.Request,
//                                 InternalRecipeUpdateCommandContract.Response
//                             >(InternalRecipeUpdateCommandContract.topic, props);
//
//                         expect(updated.ingredientCoefficient?.length).toEqual(
//                             create.length,
//                         );
//                     });
//                 });
//             });
//
//             describe(`Validation - (${InternalRecipeUpdateCommandContract.topic})`, () => {
//                 it(`duplicate title - expect ConflictException`, async () => {
//                     //
//                 });
//                 it(`empty props - expect RMQError`, async () => {
//                     //
//                 });
//                 it(`wrong uuid - expect NotFoundException`, async () => {
//                     //
//                 });
//                 it(`not valid uuid - expect RMQError`, async () => {
//                     //
//                 });
//                 it(`not valid title - expect RMQError`, async () => {
//                     //
//                 });
//             });
//         });
//
//         describe('[ D ]', () => {
//             describe(`Remove - (${InternalRecipeRemoveCommandContract.topic})`, () => {
//                 it(`expect removed recipe.uuid = passed.uuid`, async () => {
//                     //
//                 });
//             });
//
//             describe(`Validation - (${InternalRecipeRemoveCommandContract.topic})`, () => {
//                 it(`wrong uuid - expect NotFoundException`, async () => {
//                     //
//                 });
//                 it(`not valid uuid (number) - expect NotFoundException`, async () => {
//                     //
//                 });
//             });
//
//             it('Remove All created records', async () => {
//                 categories.forEach((el) => removeCategory(el.uuid));
//                 raws.forEach((el) => removeRaw(el.uuid));
//                 rawTypes.forEach((el) => removeRawType(el.uuid));
//                 ingredients.forEach((el) => removeIngredient(el.uuid));
//                 recipes.forEach((el) => removeRecipe(el.uuid));
//                 recipeTypes.forEach((el) => removeRecipeType(el.uuid));
//                 products.forEach((el) => removeProduct(el.uuid));
//             });
//         });
//     });
// });
