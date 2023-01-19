import { UserRole } from '@prisma/client/scripts/user-client';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { DateTimeFilterDto, StringFilterDto } from '../../../../common';

export class UserWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserWhereInputDto)
    AND?: UserWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserWhereInputDto)
    OR?: UserWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserWhereInputDto)
    NOT?: UserWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => DateTimeFilterDto)
    createdAt?: DateTimeFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => DateTimeFilterDto)
    updatedAt?: DateTimeFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilterDto)
    uuid?: StringFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilterDto)
    email?: StringFilterDto;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
