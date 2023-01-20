// import { UUIDService } from '@jerky/common';
// import { InternalUserHealthCheckQueryContract } from '@jerky/contracts';
// import { Injectable, Logger } from '@nestjs/common';
// import { RMQService } from 'nestjs-rmq';
//
// @Injectable()
// export class ApiUserQueriesService {
//     constructor(
//         private readonly rmqService: RMQService,
//         private readonly uuidService: UUIDService,
//     ) {}
//
//     public async healthCheck(): Promise<InternalUserHealthCheckQueryContract.Response> {
//         return await this.rmqService.send<
//             InternalUserHealthCheckQueryContract.Request,
//             InternalUserHealthCheckQueryContract.Response
//         >(
//             InternalUserHealthCheckQueryContract.topic,
//             <InternalUserHealthCheckQueryContract.Request>{},
//             {
//                 headers: {
//                     requestId: this.uuidService.getUuid(),
//                 },
//             },
//         );
//     }
//
//     public async validate({
//         email,
//         password,
//     }: UserValidate.Request): Promise<UserValidate.Response | null> {
//         try {
//             return await this.rmqService.send<
//                 UserValidate.Request,
//                 UserValidate.Response
//             >(
//                 UserValidate.topic,
//                 { email, password },
//                 {
//                     headers: {
//                         requestId: this.uuidService.getUuid(),
//                     },
//                 },
//             );
//         } catch (e) {
//             if (e instanceof Error) {
//                 Logger.log(e.message);
//             }
//             return null;
//         }
//     }
//
//     public async findOneByUuid({
//         uuid,
//     }: UserFindByUuid.Request): Promise<UserFindByUuid.Response | null> {
//         try {
//             return await this.rmqService.send<
//                 UserFindByUuid.Request,
//                 UserFindByUuid.Response
//             >(
//                 UserFindByUuid.topic,
//                 { uuid },
//                 {
//                     headers: {
//                         requestId: this.uuidService.getUuid(),
//                     },
//                 },
//             );
//         } catch (e) {
//             if (e instanceof Error) {
//                 Logger.log(e.message);
//             }
//             return null;
//         }
//     }
//
//     public async findOneByEmail({
//         email,
//     }: UserFindByEmail.Request): Promise<UserFindByEmail.Response | null> {
//         try {
//             return await this.rmqService.send<
//                 UserFindByEmail.Request,
//                 UserFindByEmail.Response
//             >(
//                 UserFindByEmail.topic,
//                 { email },
//                 {
//                     headers: {
//                         requestId: this.uuidService.getUuid(),
//                     },
//                 },
//             );
//         } catch (e) {
//             if (e instanceof Error) {
//                 Logger.log(e.message);
//             }
//             return null;
//         }
//     }
//
//     public async findFiltered({
//         take,
//         skip,
//         searchString,
//         orderBy,
//     }: UserFindFiltered.Request): Promise<UserFindFiltered.Response | null> {
//         try {
//             return await this.rmqService.send<
//                 UserFindFiltered.Request,
//                 UserFindFiltered.Response
//             >(
//                 UserFindFiltered.topic,
//                 {
//                     take,
//                     skip,
//                     searchString,
//                     orderBy,
//                 },
//                 {
//                     headers: {
//                         requestId: this.uuidService.getUuid(),
//                     },
//                 },
//             );
//         } catch (e) {
//             if (e instanceof Error) {
//                 Logger.log(e.message);
//             }
//             return null;
//         }
//     }
// }
