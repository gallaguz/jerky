import { Type } from 'class-transformer';
import { IsBoolean, IsUUID, ValidateNested } from 'class-validator';

export class Uuid {
    @IsUUID()
    uuid: string;
}

export class Connect {
    @ValidateNested({ each: true })
    @Type(() => Uuid)
    connect: Uuid[];
}
export class Disconnect {
    @ValidateNested({ each: true })
    @Type(() => Uuid)
    disconnect: Uuid[];
}
export class ConnectOne {
    @ValidateNested()
    @Type(() => Uuid)
    connect: Uuid;
}
export class DisconnectOne {
    @ValidateNested()
    @Type(() => Uuid)
    disconnect: Uuid;
}

export class DisconnectOneBoolean {
    @IsBoolean()
    disconnect: boolean;
}
