import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UUIDService {
    public getUuid(): string {
        return crypto.randomUUID();
    }
}
