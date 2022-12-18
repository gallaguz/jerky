// import {
//     Ingredient,
//     IngredientForm,
//     PrismaClient,
// } from '@prisma/client/scripts/catalog-client';
// import { TesterHelper } from './tester.helper';
// import { IBaseTester } from './base.tester.interface';
// import { IIngredient, IIngredientDto } from '@jerky/interfaces';
// import { FindManyArgs } from '@jerky/contracts';
// import * as crypto from 'crypto';
// import { faker } from '@faker-js/faker';
// import { BadRequestException } from '@nestjs/common';
// import { Random } from '@jerky/common';
//
// export class IngredientTester
//     extends TesterHelper
//     implements IBaseTester<Ingredient, IIngredient, IIngredientDto>
// {
//     modelsArray: Ingredient[] = [];
//
//     constructor(private readonly prismaClient: PrismaClient) {
//         super();
//     }
//
//     public saveModel = async (
//         ingredient?: IIngredient,
//     ): Promise<Ingredient> => {
//         const data: IIngredient = ingredient ?? {
//             uuid: crypto.randomUUID(),
//             title: faker.commerce.productName(),
//             description: faker.commerce.productDescription(),
//             form: Random.pickKey(IngredientForm),
//             price: Number(faker.commerce.price()),
//         };
//         const createdIngredient = await this.prismaClient.ingredient.create({
//             data,
//         });
//
//         this.modelsArray.push(createdIngredient);
//
//         return createdIngredient;
//     };
//
//     public findOneModel = async (uuid: string): Promise<Ingredient | null> => {
//         return this.prismaClient.ingredient.findUnique({
//             where: { uuid },
//         });
//     };
//
//     public findModelsFiltered = async (
//         props: FindManyArgs,
//     ): Promise<Ingredient[]> => {
//         return this.prismaClient.ingredient
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
//         props: IIngredientDto,
//     ): Promise<Ingredient> => {
//         return await this.prismaClient.ingredient
//             .update({
//                 where: {
//                     uuid,
//                 },
//                 data: {
//                     title: props.title,
//                     description: props.description,
//                     form: props.form,
//                     price: props.price,
//                 },
//             })
//             .catch((error) => {
//                 this.handleError(error);
//                 throw new BadRequestException();
//             });
//     };
//
//     public removeModel = async (uuid: string): Promise<Ingredient> => {
//         return this.prismaClient.ingredient.delete({
//             where: { uuid },
//         });
//     };
// }
