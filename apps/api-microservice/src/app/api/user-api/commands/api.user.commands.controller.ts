// import {
//     ExternalUserCreateCommandContract,
//     ExternalUserRemoveCommandContract,
//     ExternalUserUpdateContract,
// } from '@jerky/contracts';
// import {
//     Body,
//     Controller,
//     Delete,
//     Param,
//     Patch,
//     Post,
//     UsePipes,
//     ValidationPipe,
// } from '@nestjs/common';
//
// import { ApiUserCommandsService } from './api.user.commands.service';
//
// @Controller('user')
// export class ApiUserCommandsController {
//     constructor(private readonly userCommandsService: ApiUserCommandsService) {}
//
//     @UsePipes(new ValidationPipe())
//     @Post()
//     public async create(
//         @Body()
//         { email, password, role }: ExternalUserCreateCommandContract.Request,
//     ): Promise<ExternalUserCreateCommandContract.Response> {
//         return await this.userCommandsService.create({
//             email,
//             password,
//             role,
//         });
//     }
//
//     @UsePipes(new ValidationPipe())
//     @Delete(':uuid')
//     public async remove(
//         @Param() { uuid }: ExternalUserRemoveCommandContract.Request,
//     ): Promise<ExternalUserRemoveCommandContract.Response> {
//         return await this.userCommandsService.remove(uuid);
//     }
//
//     @UsePipes(new ValidationPipe())
//     @Patch()
//     public async update(
//         @Body() dto: ExternalUserUpdateContract.Request,
//     ): Promise<ExternalUserUpdateContract.Response> {
//         return this.userCommandsService.update(dto);
//     }
// }
