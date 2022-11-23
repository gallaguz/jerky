import { IsUUID } from 'class-validator';

export class FindOne {
    @IsUUID()
    uuid: string;
}
