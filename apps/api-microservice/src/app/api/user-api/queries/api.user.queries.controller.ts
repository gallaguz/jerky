// import { ERROR_MESSAGES } from '@jerky/constants';
// import { HttpUserFindFiltered } from '@jerky/contracts';
// import {
//     Body,
//     Controller,
//     Get,
//     HttpCode,
//     NotFoundException,
//     Param,
//     Post,
//     UsePipes,
//     ValidationPipe,
// } from '@nestjs/common';
//
// import { ApiUserQueriesService } from './api.user.queries.service';
// import USER = ERROR_MESSAGES.USER;
//
// @Controller('user')
// export class ApiUserQueriesController {
//     constructor(private readonly userQueriesService: ApiUserQueriesService) {}
//
//     @HttpCode(200)
//     @Get('healthCheck')
//     public async healthCheck(): Promise<UserHealthCheck.Response> {
//         return this.userQueriesService.healthCheck();
//     }
//
//     @UsePipes(new ValidationPipe())
//     @HttpCode(200)
//     @Get(':uuid')
//     public async findOneByUuid(
//         @Param() dto: UserFindByUuid.Request,
//     ): Promise<UserFindByUuid.Response> {
//         const user = await this.userQueriesService.findOneByUuid(dto);
//         if (!user) throw new NotFoundException(USER.NOT_FOUND);
//         return user;
//     }
//
//     // @UseGuards(new JwtGuard([Role.ADMIN]))
//     @UsePipes(new ValidationPipe())
//     @HttpCode(200)
//     @Post('email')
//     public async findOneByEmail(
//         // @JWTPayload() { role }: ITokenPayload,
//         @Body() dto: UserFindByEmail.Request,
//     ): Promise<UserFindByEmail.Response> {
//         const user = await this.userQueriesService.findOneByEmail(dto);
//         if (!user) throw new NotFoundException(USER.NOT_FOUND);
//         return user;
//     }
//
//     @UsePipes(new ValidationPipe())
//     @HttpCode(200)
//     @Post('find')
//     public async findFiltered(
//         @Body() dto: HttpUserFindFiltered.Request,
//     ): Promise<HttpUserFindFiltered.Response> {
//         const users = await this.userQueriesService.findFiltered(dto);
//         if (!users?.length) throw new NotFoundException(USER.NOT_FOUND);
//         return users;
//     }
// }
