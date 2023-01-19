import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { UserSelectDto, UserWhereUniqueInputDto } from '../other';

export class UserFindOneOrThrowArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => UserSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: UserSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserWhereUniqueInputDto)
    where: UserWhereUniqueInputDto;
}
