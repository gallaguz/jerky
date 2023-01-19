import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { UserSelectDto } from '../other';
import { UserCreateInputDto } from './user-create-input';

export class UserCreateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => UserSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: UserSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserCreateInputDto)
    data: UserCreateInputDto;
}
