// import { TesterHelper } from './tester.helper';
// import { IBaseTester } from './base.tester.interface';
// import {
//     IngredientQty,
//     PrismaClient,
// } from '@prisma/client/scripts/catalog-client';
// import {
//     IIngredientConnect,
//     IIngredientDisconnect,
//     IIngredientQty,
//     IIngredientQtyProps,
// } from '@jerky/interfaces';
// import { FindManyArgs } from '@jerky/contracts';
// import { BadRequestException } from '@nestjs/common';
//
// export class IngredientQtyTester
//     extends TesterHelper
//     implements IBaseTester<IngredientQty, IIngredientQty, IIngredientQtyProps>
// {
//     modelsArray: IngredientQty[] = [];
//
//     constructor(private readonly prismaClient: PrismaClient) {
//         super();
//     }
//
//     public saveModel = async (
//         props: IIngredientQty,
//         ingredientUuid: string,
//     ): Promise<IngredientQty> => {
//         const data = {
//             uuid: props.uuid,
//             qtyPerKg: props.qtyPerKg,
//             ingredient: { connect: { uuid: ingredientUuid } },
//         };
//         const ingredientQty = await this.prismaClient.ingredientQty.create({
//             data,
//         });
//
//         this.modelsArray.push(ingredientQty);
//
//         return ingredientQty;
//     };
//
//     public findOneModel = async (
//         uuid: string,
//     ): Promise<IngredientQty | null> => {
//         return this.prismaClient.ingredientQty.findUnique({
//             where: { uuid },
//         });
//     };
//
//     public findModelsFiltered = async (
//         props: FindManyArgs,
//     ): Promise<IngredientQty[]> => {
//         return this.prismaClient.ingredientQty
//             .findMany({
//                 take: this.take(props.take),
//                 skip: this.skip(props.skip),
//             })
//             .catch((error) => {
//                 this.handleError(error);
//                 throw new BadRequestException();
//             });
//     };
//
//     public updateModel = async (
//         uuid: string,
//         props: IIngredientQtyProps,
//         ingredient: IIngredientConnect | IIngredientDisconnect,
//     ): Promise<IngredientQty> => {
//         return this.prismaClient.ingredientQty
//             .update({
//                 where: {
//                     uuid,
//                 },
//                 data: { qtyPerKg: props.qtyPerKg, ingredient },
//             })
//             .catch((error) => {
//                 this.handleError(error);
//                 throw new BadRequestException();
//             });
//     };
//
//     public removeModel = async (uuid: string): Promise<IngredientQty> => {
//         return this.prismaClient.ingredientQty.delete({
//             where: { uuid },
//         });
//     };
// }
