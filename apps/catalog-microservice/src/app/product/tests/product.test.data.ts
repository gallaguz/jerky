// import {
//     InternalProductCreateCommandContract,
//     InternalProductFindManyQueryContract,
//     InternalProductFindOneTitleQueryContract,
//     InternalProductFindOneUuidQueryContract,
//     InternalProductRemoveCommandContract,
//     InternalProductUpdateCommandContract,
// } from '@jerky/contracts';
// import { Product } from '@prisma/client/scripts/catalog-client';
//
// export namespace ProductTestData {
//     export type TModel = Product;
//     export class CreateRequest extends InternalProductCreateCommandContract.Request {}
//     export type CreateResponse = InternalProductCreateCommandContract.Response;
//     export const CreateTopic = InternalProductCreateCommandContract.topic;
//
//     export class UpdateRequest extends InternalProductUpdateCommandContract.Request {}
//     export type UpdateResponse = InternalProductUpdateCommandContract.Response;
//     export const UpdateTopic = InternalProductUpdateCommandContract.topic;
//
//     export class RemoveRequest extends InternalProductRemoveCommandContract.Request {}
//     export type RemoveResponse = InternalProductRemoveCommandContract.Response;
//     export const RemoveTopic = InternalProductRemoveCommandContract.topic;
//
//     export class FindOneUuidRequest extends InternalProductFindOneUuidQueryContract.Request {}
//     export type FindOneUuidResponse =
//         InternalProductFindOneUuidQueryContract.Response;
//     export const FindOneUuidTopic =
//         InternalProductFindOneUuidQueryContract.topic;
//
//     export class FindOneTitleRequest extends InternalProductFindOneTitleQueryContract.Request {}
//     export type FindOneTitleResponse =
//         InternalProductFindOneTitleQueryContract.Response;
//     export const FindOneTitleTopic =
//         InternalProductFindOneTitleQueryContract.topic;
//
//     export class FindManyRequest extends InternalProductFindManyQueryContract.Request {}
//     export type FindManyResponse =
//         InternalProductFindManyQueryContract.Response;
//     export const FindManyTopic = InternalProductFindManyQueryContract.topic;
// }
