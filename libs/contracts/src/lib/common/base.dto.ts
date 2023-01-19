import { ALIAS, DESCRIPTION, TAKE, TITLE } from '@jerky/constants';
import { Prisma } from '@prisma/client/scripts/catalog-client';
import { Transform, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import SortOrder = Prisma.SortOrder;

export class TakeSkip {
    @IsOptional()
    @Max(TAKE.MAX)
    @Min(TAKE.MIN)
    @IsNumber()
    @Transform(({ value }) =>
        value >= TAKE.MIN && value <= TAKE.MAX ? value : false,
    )
    take?: number;

    @IsOptional()
    @Max(TAKE.MAX)
    @Min(TAKE.MIN)
    @IsNumber()
    @Transform(({ value }) => (Number.isSafeInteger(value) ? value : false))
    skip?: number;
}
export class NestedStringFilterDto {
    @IsOptional()
    @IsString()
    equals?: string;

    @IsOptional()
    @IsString({ each: true })
    in?: string[];

    @IsOptional()
    @IsString({ each: true })
    notIn?: string[];

    @IsOptional()
    @IsString()
    lt?: string;

    @IsOptional()
    @IsString()
    lte?: string;

    @IsOptional()
    @IsString()
    gt?: string;

    @IsOptional()
    @IsString()
    gte?: string;

    @IsOptional()
    @IsString()
    contains?: string;

    @IsOptional()
    @IsString()
    startsWith?: string;

    @IsOptional()
    @IsString()
    endsWith?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => NestedStringFilterDto)
    @ValidateIf((_, value) => typeof value !== 'string')
    not?: NestedStringFilterDto | string;
}
export class StringFilterDto {
    @IsOptional()
    @IsString()
    equals?: string;

    @IsOptional()
    @IsString({ each: true })
    in?: string[];

    @IsOptional()
    @IsString({ each: true })
    notIn?: string[];

    @IsOptional()
    @IsString()
    lt?: string;

    @IsOptional()
    @IsString()
    lte?: string;

    @IsOptional()
    @IsString()
    gt?: string;

    @IsOptional()
    @IsString()
    gte?: string;

    @IsOptional()
    @IsString()
    contains?: string;

    @IsOptional()
    @IsString()
    startsWith?: string;

    @IsOptional()
    @IsString()
    endsWith?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => NestedStringFilterDto)
    @ValidateIf((_, value) => typeof value !== 'string')
    not?: NestedStringFilterDto | string;
}
export class NestedIntFilterDto {
    @IsOptional()
    @IsNumber()
    equals?: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    in?: number[];

    @IsOptional()
    @IsNumber({}, { each: true })
    notIn?: number[];

    @IsOptional()
    @IsNumber()
    lt?: number;

    @IsOptional()
    @IsNumber()
    lte?: number;

    @IsOptional()
    @IsNumber()
    gt?: number;

    @IsOptional()
    @IsNumber()
    gte?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => NestedIntFilterDto)
    @ValidateIf((_, value) => typeof value !== 'number')
    not?: NestedIntFilterDto | number;
}
export class NestedFloatFilterDto {
    @IsOptional()
    @IsNumber()
    equals?: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    in?: number[];

    @IsOptional()
    @IsNumber({}, { each: true })
    notIn?: number[];

    @IsOptional()
    @IsNumber()
    lt?: number;

    @IsOptional()
    @IsNumber()
    lte?: number;

    @IsOptional()
    @IsNumber()
    gt?: number;

    @IsOptional()
    @IsNumber()
    gte?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => NestedIntFilterDto)
    @ValidateIf((_, value) => typeof value !== 'number')
    not?: NestedIntFilterDto | number;
}
export class IntFilterDto {
    @IsOptional()
    @IsNumber()
    equals?: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    in?: number[];

    @IsOptional()
    @IsNumber({}, { each: true })
    notIn?: number[];

    @IsOptional()
    @IsNumber()
    lt?: number;

    @IsOptional()
    @IsNumber()
    lte?: number;

    @IsOptional()
    @IsNumber()
    gt?: number;

    @IsOptional()
    @IsNumber()
    gte?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => NestedIntFilterDto)
    @ValidateIf((_, value) => typeof value !== 'number')
    not?: NestedIntFilterDto | number;
}
export class FloatFilterDto {
    @IsOptional()
    @IsNumber()
    equals?: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    in?: number[];

    @IsOptional()
    @IsNumber({}, { each: true })
    notIn?: number[];

    @IsOptional()
    @IsNumber()
    lt?: number;

    @IsOptional()
    @IsNumber()
    lte?: number;

    @IsOptional()
    @IsNumber()
    gt?: number;

    @IsOptional()
    @IsNumber()
    gte?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => NestedFloatFilterDto)
    @ValidateIf((_, value) => typeof value !== 'number')
    not?: NestedFloatFilterDto | number;
}
export class IntNullableFilterDto {
    @IsOptional()
    @IsNumber()
    equals?: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    in?: number[];

    @IsOptional()
    @IsNumber({}, { each: true })
    notIn?: number[];

    @IsOptional()
    @IsNumber()
    lt?: number;

    @IsOptional()
    @IsNumber()
    lte?: number;

    @IsOptional()
    @IsNumber()
    gt?: number;

    @IsOptional()
    @IsNumber()
    gte?: number;

    @IsOptional()
    @IsNumber()
    not?: number;
}
export class NestedDateTimeFilterDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    equals?: Date;

    @IsOptional()
    @IsDate({ each: true })
    @Type(() => Date)
    in?: Date[];

    @IsOptional()
    @IsDate({ each: true })
    @Type(() => Date)
    notIn?: Date[];

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lte?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    gt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    gte?: Date;

    @IsOptional()
    @ValidateNested()
    @Type(() => NestedDateTimeFilterDto)
    not?: NestedDateTimeFilterDto;
}
export class DateTimeFilterDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    equals?: Date;

    @IsOptional()
    @IsDate({ each: true })
    @Type(() => Date)
    in?: Date[];

    @IsOptional()
    @IsDate({ each: true })
    @Type(() => Date)
    notIn?: Date[];

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lte?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    gt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    gte?: Date;

    @IsOptional()
    @ValidateNested()
    @Type(() => NestedDateTimeFilterDto)
    not?: NestedDateTimeFilterDto;
}
export class NullableIntFieldUpdateOperationsInputDto {
    @IsOptional()
    @IsNumber()
    @ValidateIf((_, value) => value !== null)
    set?: number | null;

    @IsOptional()
    @IsNumber()
    increment?: number;

    @IsOptional()
    @IsNumber()
    decrement?: number;

    @IsOptional()
    @IsNumber()
    multiply?: number;

    @IsOptional()
    @IsNumber()
    divide?: number;
}
export class StringFieldUpdateOperationsInputDto {
    @IsOptional()
    @IsString()
    set?: string;
}
export class NullableStringFieldUpdateOperationsInputDto {
    @IsOptional()
    @IsNumber()
    @ValidateIf((_, value) => value !== null)
    set?: number | null;
}
export class DateTimeFieldUpdateOperationsInputDto {
    @IsOptional()
    @IsDate()
    set?: Date;
}
export class IntFieldUpdateOperationsInputDto {
    @IsOptional()
    @IsNumber()
    @ValidateIf((_, value) => value !== null)
    set?: number | null;

    @IsOptional()
    @IsNumber()
    increment?: number;

    @IsOptional()
    @IsNumber()
    decrement?: number;

    @IsOptional()
    @IsNumber()
    multiply?: number;

    @IsOptional()
    @IsNumber()
    divide?: number;
}
export class FloatFieldUpdateOperationsInputDto {
    @IsOptional()
    @IsNumber()
    set?: number;

    @IsOptional()
    @IsNumber()
    increment?: number;

    @IsOptional()
    @IsNumber()
    decrement?: number;

    @IsOptional()
    @IsNumber()
    multiply?: number;

    @IsOptional()
    @IsNumber()
    divide?: number;
}
export class BaseCreateInputDto {
    @MaxLength(ALIAS.MAX_LENGTH)
    @MinLength(ALIAS.MIN_LENGTH)
    @IsString()
    alias: string;

    @MaxLength(TITLE.MAX_LENGTH)
    @MinLength(TITLE.MIN_LENGTH)
    @IsString()
    title: string;

    @IsOptional()
    @MaxLength(DESCRIPTION.MAX_LENGTH)
    @MinLength(DESCRIPTION.MIN_LENGTH)
    @IsString()
    description?: string;
}
export class BaseUpdateInputDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;

    @IsOptional()
    @IsString()
    alias?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
export class BaseCatalogOrderByDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    createdAt?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    updatedAt?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    alias?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return {};
    })
    title?: SortOrder;
}
export class BaseCatalogSelectDto {
    @IsOptional()
    @IsBoolean()
    uuid?: boolean;

    @IsOptional()
    @IsBoolean()
    createdAt?: boolean;

    @IsOptional()
    @IsBoolean()
    updatedAt?: boolean;

    @IsOptional()
    @IsBoolean()
    alias?: boolean;

    @IsOptional()
    @IsBoolean()
    title?: boolean;

    @IsOptional()
    @IsBoolean()
    description?: boolean;
}
export class BaseCatalogWhereInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilterDto)
    uuid?: StringFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilterDto)
    alias?: StringFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilterDto)
    title?: StringFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilterDto)
    description?: StringFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => DateTimeFilterDto)
    createdAt?: DateTimeFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => DateTimeFilterDto)
    updatedAt?: DateTimeFilterDto;
}
