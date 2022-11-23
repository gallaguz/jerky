import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserCreate, UserUpdate } from '@jerky/contracts';
import { UserEntity } from '../entities/user.entity';
import { IUser } from '@jerky/interfaces';
import { UserModel } from '../models/user.model';
import { ERROR_MESSAGES } from '@jerky/constants';
import SOMETHING_WENT_WRONG = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
import USER = ERROR_MESSAGES.USER;

@Injectable()
export class UserCommandsService {
    constructor(private readonly userRepository: UserRepository) {}

    public async create(dto: UserCreate.Request): Promise<IUser> {
        const { uuid, email, passwordHash, role } = await new UserEntity(
            dto.email,
            dto.password,
            dto.role,
        ).setPassword(dto.password);

        const existedUser = await this.userRepository.findOneByEmail(email);
        if (existedUser) throw new NotFoundException(USER.USER_EXIST);

        const newUser = await this.userRepository.create(
            uuid,
            email,
            passwordHash,
            role,
        );
        if (!newUser) {
            throw new BadRequestException(SOMETHING_WENT_WRONG);
        }
        return new UserModel(newUser);
    }

    public async delete(uuid: string): Promise<IUser> {
        const existedUser = await this.userRepository.findOneByUuid(uuid);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);

        const deletedUser = await this.userRepository.delete(uuid);
        if (!deletedUser) throw new BadRequestException(SOMETHING_WENT_WRONG);
        return new UserModel(deletedUser);
    }

    public async update({
        uuid,
        email,
        password,
        role,
    }: UserUpdate.Request): Promise<IUser> {
        const existedUser = await this.userRepository.findOneByUuid(uuid);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);

        const userEntity = await new UserEntity(uuid);
        if (password) await userEntity.updatePassword(password);
        if (email) userEntity.updateEmail(email);
        if (role) userEntity.updateRole(role);

        const updatedUser = await this.userRepository.update(userEntity);

        if (!updatedUser) throw new BadRequestException(SOMETHING_WENT_WRONG);
        return new UserModel(updatedUser);
    }
}
