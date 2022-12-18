// import {
//     PrismaClient,
//     RecipeType,
// } from '@prisma/client/scripts/catalog-client';
// import { IRecipeType, IRecipeTypeProps } from '@jerky/interfaces';
// import * as crypto from 'crypto';
// import { faker } from '@faker-js/faker';
// import { IBaseTester } from './base.tester.interface';
// import { BadRequestException } from '@nestjs/common';
// import { TesterHelper } from './tester.helper';
// import { FindManyArgs } from '@jerky/contracts';
//
// export class RecipeTypeTester
//     extends TesterHelper
//     implements IBaseTester<RecipeType, IRecipeType, IRecipeTypeProps>
// {
//     public modelsArray: RecipeType[] = [];
//
//     constructor(private readonly prismaClient: PrismaClient) {
//         super();
//     }
//
//     public saveModel = async (
//         recipeType?: IRecipeType,
//     ): Promise<RecipeType> => {
//         let data: IRecipeType;
//         if (!recipeType) {
//             data = {
//                 uuid: crypto.randomUUID(),
//                 title: faker.commerce.productName(),
//                 description: faker.commerce.productDescription(),
//             };
//         } else {
//             data = recipeType;
//         }
//
//         const createdRecipeType = await this.prismaClient.recipeType.create({
//             data,
//         });
//
//         this.modelsArray.push(createdRecipeType);
//
//         return createdRecipeType;
//     };
//
//     public findOneModel = async (uuid: string): Promise<RecipeType | null> => {
//         return this.prismaClient.recipeType.findUnique({
//             where: { uuid },
//         });
//     };
//
//     public findModelsFiltered = async (
//         props: FindManyArgs,
//     ): Promise<RecipeType[]> => {
//         return this.prismaClient.recipeType
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
//         props: IRecipeTypeProps,
//     ): Promise<RecipeType> => {
//         return await this.prismaClient.recipeType
//             .update({
//                 where: {
//                     uuid,
//                 },
//                 data: {
//                     title: props.title,
//                     description: props.description,
//                 },
//             })
//             .catch((error) => {
//                 this.handleError(error);
//                 throw new BadRequestException();
//             });
//     };
//
//     public removeModel = async (uuid: string): Promise<RecipeType> => {
//         return this.prismaClient.recipeType.delete({
//             where: { uuid },
//         });
//     };
// }
