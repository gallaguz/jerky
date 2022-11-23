import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserFindFiltered, UserValidate } from '@jerky/contracts';
import { RMQService } from 'nestjs-rmq';
import { UserModel } from '../models/user.model';
import { IUser } from '@jerky/interfaces';
import { UserEntity } from '../entities/user.entity';
import { ERROR_MESSAGES } from '@jerky/constants';
import USER = ERROR_MESSAGES.USER;

@Injectable()
export class UserQueriesService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly rmqService: RMQService,
    ) {}

    public async healthCheck(): Promise<boolean> {
        return this.rmqService.healthCheck();
    }

    public async validate({
        email,
        password,
    }: UserValidate.Request): Promise<UserValidate.Response> {
        const existedUser = await this.findOneByEmail(email);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);
        const validationResult = await new UserEntity(
            email,
            existedUser.passwordHash,
        ).validatePassword(password);
        if (!validationResult)
            throw new BadRequestException(USER.WRONG_PASSWORD);
        return existedUser;
    }

    public async findOneByUuid(uuid: string): Promise<IUser> {
        const existedUser = await this.userRepository.findOneByUuid(uuid);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);
        return new UserModel(existedUser);
    }

    public async findOneByEmail(email: string): Promise<IUser> {
        const existedUser = await this.userRepository.findOneByEmail(email);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);
        return new UserModel(existedUser);
    }

    public async findFiltered({
        searchString,
        skip,
        take,
        orderBy,
    }: UserFindFiltered.Request): Promise<IUser[]> {
        const filteredUsers = await this.userRepository.findFiltered({
            searchString,
            skip,
            take,
            orderBy,
        });
        if (!filteredUsers) throw new NotFoundException(USER.NOT_FOUND);
        return filteredUsers.map((user) => {
            return new UserModel(user);
        });
    }
}
