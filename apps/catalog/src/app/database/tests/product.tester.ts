// import { PrismaClient, Product } from '@prisma/client/scripts/catalog-client';
// import { TesterHelper } from './tester.helper';
// import { IBaseTester } from './base.tester.interface';
// import { FindManyArgs } from '@jerky/contracts';
// import { IProduct, IProductProps } from '@jerky/interfaces';
// import { BadRequestException } from '@nestjs/common';
//
// export class ProductTester
//     extends TesterHelper
//     implements IBaseTester<Product, IProduct, IProductProps>
// {
//     modelsArray: Product[] = [];
//
//     constructor(private readonly prismaClient: PrismaClient) {
//         super();
//     }
//
//     public saveModel = async (props: IProduct): Promise<Product> => {
//         const model = await this.prismaClient.product.create({
//             data: props,
//         });
//
//         this.modelsArray.push(model);
//
//         return model;
//     };
//
//     public findOneModel = async (uuid: string): Promise<Product | null> => {
//         return this.prismaClient.product.findUnique({
//             where: { uuid },
//         });
//     };
//
//     public findModelsFiltered = async (
//         props: FindManyArgs,
//     ): Promise<Product[]> => {
//         return this.prismaClient.product
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
//         props: IProductProps,
//     ): Promise<Product> => {
//         return this.prismaClient.product.update({
//             where: {
//                 uuid,
//             },
//             data: props,
//         });
//     };
//
//     public removeModel = async (uuid: string): Promise<Product> => {
//         return this.prismaClient.product.delete({
//             where: { uuid },
//         });
//     };
// }
