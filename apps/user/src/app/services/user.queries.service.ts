import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { UserFindFiltered } from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class UserQueriesService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly rmqService: RMQService,
    ) {}

    public async healthCheck(): Promise<boolean> {
        return this.rmqService.healthCheck();
    }

    public async findOneByUuid(uuid: string): Promise<User> {
        const existedUser = await this.userRepository.findOneByUuid(uuid);
        if (!existedUser) throw new NotFoundException('User not found');
        return existedUser;
    }

    public async findOneByEmail(email: string): Promise<User> {
        const existedUser = await this.userRepository.findOneByEmail(email);
        if (!existedUser) throw new NotFoundException('User not found');
        return existedUser;
    }

    public async findFiltered(dto: UserFindFiltered.Request): Promise<User[]> {
        const filteredUsers = await this.userRepository.findFiltered(dto);
        if (!filteredUsers.length)
            throw new NotFoundException('Users not found');
        return filteredUsers;
    }
}
