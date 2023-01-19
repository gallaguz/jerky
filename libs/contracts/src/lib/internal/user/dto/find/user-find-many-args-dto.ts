import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { TakeSkip } from '../../../../common';
import {
    UserOrderByDto,
    UserSelectDto,
    UserWhereInputDto,
    UserWhereUniqueInputDto,
} from '../other';

export class UserFindManyArgsDto extends TakeSkip {
    @IsOptional()
    @ValidateNested()
    @Type(() => UserSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: UserSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserWhereInputDto)
    where?: UserWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserOrderByDto)
    orderBy?: UserOrderByDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => UserWhereUniqueInputDto)
    cursor?: UserWhereUniqueInputDto;
}
