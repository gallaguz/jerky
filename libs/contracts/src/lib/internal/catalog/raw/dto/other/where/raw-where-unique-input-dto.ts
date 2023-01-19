import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RawWhereUniqueInputDto {
    @IsOptional()
    @IsUUID()
    uuid?: string;

    @IsOptional()
    @IsString()
    alias?: string;

    @IsOptional()
    @IsString()
    title?: string;
}
