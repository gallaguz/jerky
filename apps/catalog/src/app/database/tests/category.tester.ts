// import { Category, PrismaClient } from '@prisma/client/scripts/catalog-client';
// import { ICategory, ICategoryProps } from '@jerky/interfaces';
// import { IBaseTester } from './base.tester.interface';
// import { FindManyArgs } from '@jerky/contracts';
// import { BadRequestException } from '@nestjs/common';
// import { TesterHelper } from './tester.helper';
//
// export class CategoryTester
//     extends TesterHelper
//     implements IBaseTester<Category, ICategory, ICategoryProps>
// {
//     public modelsArray: Category[] = [];
//
//     constructor(private readonly prismaClient: PrismaClient) {
//         super();
//     }
//
//     public saveModel = async (category: ICategory): Promise<Category> => {
//         const createdCategory = await this.prismaClient.category.create({
//             data: category,
//         });
//
//         this.modelsArray.push(createdCategory);
//
//         return createdCategory;
//     };
//
//     public findOneModel = async (uuid: string): Promise<Category | null> => {
//         return this.prismaClient.category.findUnique({
//             where: { uuid },
//         });
//     };
//
//     public findModelsFiltered = async (
//         props: FindManyArgs,
//     ): Promise<Category[]> => {
//         return this.prismaClient.category
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
//         props: ICategoryProps,
//     ): Promise<Category> => {
//         return await this.prismaClient.category
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
//     public removeModel = async (uuid: string): Promise<Category> => {
//         return this.prismaClient.category.delete({
//             where: { uuid },
//         });
//     };
// }
