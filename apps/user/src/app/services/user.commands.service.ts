import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import {
    UserCreate,
    UserUpdateEmail,
    UserUpdatePassword,
    UserUpdateRole,
} from '@jerky/contracts';
import { UserEntity } from '../entities/user.entity';
import { SOMETHING_WENT_WRONG, USER } from '@jerky/constants';
import { IUser } from '@jerky/interfaces';
import { UserModel } from '../models/user.model';

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

    public async updatePassword({
        uuid,
        password,
    }: UserUpdatePassword.Request): Promise<IUser> {
        const existedUser = await this.userRepository.findOneByUuid(uuid);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);

        const userEntity = await new UserEntity().setPassword(password);
        const updatedUser = await this.userRepository.updatePasswordHash(
            uuid,
            userEntity.passwordHash,
        );

        if (!updatedUser) throw new BadRequestException(SOMETHING_WENT_WRONG);
        return new UserModel(updatedUser);
    }

    public async updateEmail({
        uuid,
        email,
    }: UserUpdateEmail.Request): Promise<IUser> {
        const existedUser = await this.userRepository.findOneByUuid(uuid);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);

        const userEntity = new UserEntity().updateEmail(email);
        const updatedUser = await this.userRepository.updateEmail(
            uuid,
            userEntity.email,
        );

        if (!updatedUser) throw new BadRequestException(SOMETHING_WENT_WRONG);
        return new UserModel(updatedUser);
    }

    public async updateRole(dto: UserUpdateRole.Request): Promise<IUser> {
        const { uuid, role } = dto;
        const existedUser = await this.userRepository.findOneByUuid(uuid);
        if (!existedUser) throw new NotFoundException(USER.NOT_FOUND);

        const userEntity = new UserEntity().updateRole(role);
        const updatedUser = await this.userRepository.updateRole(
            uuid,
            userEntity.role,
        );

        if (!updatedUser) throw new BadRequestException(SOMETHING_WENT_WRONG);
        return new UserModel(updatedUser);
    }
}
