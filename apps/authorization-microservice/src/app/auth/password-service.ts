import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class PasswordService {
    constructor(private readonly configService: ConfigService) {}

    public async hashPassword(
        password: string,
    ): Promise<{ salt: string; passwordHash: string }> {
        const salt = await this.generateSalt();
        const passwordHash = await hash(password, salt);
        return { salt, passwordHash };
    }
    public async validatePassword(
        passwordAttempt: string,
        passwordHash: string,
    ): Promise<boolean> {
        return await compare(passwordAttempt, passwordHash);
    }
    private async generateSalt(rounds = 12): Promise<string> {
        return await genSalt(rounds);
    }
}
