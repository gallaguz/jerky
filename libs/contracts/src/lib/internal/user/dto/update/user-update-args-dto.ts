import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { UserSelectDto, UserWhereUniqueInputDto } from '../other';
import { UserUpdateInputDto } from './user-update-input-dto';

export class UserUpdateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => UserSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: UserSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserUpdateInputDto)
    data: UserUpdateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserWhereUniqueInputDto)
    where: UserWhereUniqueInputDto;
}
