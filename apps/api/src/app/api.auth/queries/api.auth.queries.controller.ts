import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../system/guards/jwt.guard';
import { JWTPayload } from '../../system/decorators/jwt.payload.decorator';
import { ITokenPayload, IUser } from '@jerky/interfaces';
import { ApiAuthQueriesService } from './api.auth.queries.service';

@Controller('v1/auth')
export class ApiAuthQueriesController {
    constructor(private readonly authQueriesService: ApiAuthQueriesService) {}

    @UseGuards(JwtGuard)
    @Get('info')
    public async info(@JWTPayload() { uuid }: ITokenPayload): Promise<IUser> {
        return await this.authQueriesService.info(uuid);
    }
}
