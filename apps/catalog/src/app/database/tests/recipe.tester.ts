// import { PrismaClient, Recipe } from '@prisma/client/scripts/catalog-client';
// import { TesterHelper } from './tester.helper';
// import { IBaseTester } from './base.tester.interface';
// import {
//     IIngredientConnect,
//     IIngredientDisconnect,
//     IRecipe,
//     IRecipeProps,
//     IUuid,
// } from '@jerky/interfaces';
// import { FindManyArgs } from '@jerky/contracts';
// import { BadRequestException } from '@nestjs/common';
//
// export class RecipeTester
//     extends TesterHelper
//     implements IBaseTester<Recipe, IRecipe, IRecipeProps>
// {
//     public modelsArray: Recipe[] = [];
//
//     constructor(private readonly prismaClient: PrismaClient) {
//         super();
//     }
//
//     public saveModel = async (
//         props: IRecipe,
//         ingredientQtyUuids: IUuid[],
//     ): Promise<Recipe> => {
//         const model = await this.prismaClient.recipe.create({
//             data: {
//                 ...props,
//                 ingredientQty: {
//                     connect: ingredientQtyUuids,
//                 },
//             },
//         });
//
//         this.modelsArray.push(model);
//
//         return model;
//     };
//
//     public findOneModel = async (uuid: string): Promise<Recipe | null> => {
//         return this.prismaClient.recipe.findUnique({
//             where: { uuid },
//         });
//     };
//
//     public findModelsFiltered = async (
//         props: FindManyArgs,
//     ): Promise<Recipe[]> => {
//         return this.prismaClient.recipe
//             .findMany({
//                 where: this.or(props.searchString),
//                 take: this.take(props.take),
//                 skip: this.skip(props.skip),
//                 orderBy: this.orderBy(props.orderBy),
//             })
//             .catch((error) => {
//                 this.handleError(error);
//                 throw new BadRequestException();
//             });
//     };
//
//     public updateModel = async (
//         uuid: string,
//         props: IRecipeProps,
//         ingredientQty: IIngredientConnect | IIngredientDisconnect,
//     ): Promise<Recipe> => {
//         return this.prismaClient.recipe.update({
//             where: {
//                 uuid,
//             },
//             data: {
//                 title: props.title,
//                 description: props.description,
//                 categoryUuid: props.categoryUuid,
//                 rawUuid: props.rawUuid,
//                 recipeTypeUuid: props.recipeTypeUuid,
//                 ingredientQty,
//             },
//         });
//     };
//
//     public removeModel = async (uuid: string): Promise<Recipe> => {
//         return this.prismaClient.recipe.delete({
//             where: { uuid },
//         });
//     };
// }
