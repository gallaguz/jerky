// import { ERROR_MESSAGES } from '@jerky/constants';
// import {
//     ExternalUserCreateCommandContract,
//     InternalUserCreateCommandContract,
//     UserRemoveEvent,
// } from '@jerky/contracts';
// import { BadRequestException, Injectable } from '@nestjs/common';
// import { RMQService } from 'nestjs-rmq';
// import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
// import { UUIDService } from '@jerky/common';
//
// @Injectable()
// export class ApiUserCommandsService {
//     constructor(
//         private readonly rmqService: RMQService,
//         private readonly uuidService: UUIDService,
//     ) {}
//
//     public async create(
//         dto: ExternalUserCreateCommandContract.Request,
//     ): Promise<ExternalUserCreateCommandContract.Response> {
//         try {
//             return await this.rmqService.send<
//                 InternalUserCreateCommandContract.Request,
//                 InternalUserCreateCommandContract.Response
//             >(InternalUserCreateCommandContract.topic, dto, {
//                 headers: {
//                     requestId: this.uuidService.getUuid(),
//                 },
//             });
//         } catch (e) {
//             if (e instanceof Error) {
//                 throw new BadRequestException(e.message);
//             }
//         }
//         throw new BadRequestException(SOMETHING_WENT_WRONG);
//     }
//
//     public async remove(uuid: string): Promise<UserRemove.Response> {
//         try {
//             return await this.rmqService.send<
//                 UserRemove.Request,
//                 UserRemove.Response
//             >(
//                 UserRemoveEvent.topic,
//                 { uuid },
//                 {
//                     headers: {
//                         requestId: this.uuidService.getUuid(),
//                     },
//                 },
//             );
//         } catch (e) {
//             if (e instanceof Error) {
//                 throw new BadRequestException(e.message);
//             }
//         }
//         throw new BadRequestException(SOMETHING_WENT_WRONG);
//     }
//
//     public async update(
//         props: UserUpdate.Request,
//     ): Promise<UserUpdate.Response> {
//         try {
//             return await this.rmqService.send<
//                 UserUpdate.Request,
//                 UserUpdate.Response
//             >(UserUpdate.topic, props, {
//                 headers: {
//                     requestId: this.uuidService.getUuid(),
//                 },
//             });
//         } catch (e) {
//             if (e instanceof Error) {
//                 throw new BadRequestException(e.message);
//             }
//         }
//         throw new BadRequestException(SOMETHING_WENT_WRONG);
//     }
// }
