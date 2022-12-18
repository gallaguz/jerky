// import { PrismaClient, Raw } from '@prisma/client/scripts/catalog-client';
// import { TesterHelper } from './tester.helper';
// import { IBaseTester } from './base.tester.interface';
// import { IRaw, IRawProps } from '@jerky/interfaces';
// import { FindManyArgs } from '@jerky/contracts';
// import { BadRequestException } from '@nestjs/common';
//
// export class RawTester
//     extends TesterHelper
//     implements IBaseTester<Raw, IRaw, IRawProps>
// {
//     modelsArray: Raw[] = [];
//
//     constructor(private readonly prismaClient: PrismaClient) {
//         super();
//     }
//
//     public saveModel = async (
//         props: IRaw,
//         categoryUuid: string,
//     ): Promise<Raw> => {
//         const createdRaw = await this.prismaClient.raw.create({
//             data: {
//                 ...props,
//                 category: {
//                     connect: { uuid: categoryUuid },
//                 },
//             },
//         });
//
//         this.modelsArray.push(createdRaw);
//
//         return createdRaw;
//     };
//
//     public findOneModel = async (uuid: string): Promise<Raw | null> => {
//         return this.prismaClient.raw.findUnique({
//             where: { uuid },
//         });
//     };
//
//     public findModelsFiltered = async (props: FindManyArgs): Promise<Raw[]> => {
//         return this.prismaClient.raw
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
//         props: IRawProps,
//         categoryUuid: string,
//     ): Promise<Raw> => {
//         return await this.prismaClient.raw
//             .update({
//                 where: {
//                     uuid,
//                 },
//                 data: {
//                     title: props.title,
//                     description: props.description,
//                     price: props.price,
//                     category: {
//                         connect: { uuid: categoryUuid },
//                     },
//                 },
//             })
//             .catch((error) => {
//                 this.handleError(error);
//                 throw new BadRequestException();
//             });
//     };
//
//     public removeModel = async (uuid: string): Promise<Raw> => {
//         return this.prismaClient.raw.delete({
//             where: { uuid },
//         });
//     };
// }
