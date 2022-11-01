import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import {
    UserCreate,
    UserUpdateEmail,
    UserUpdatePasswordHash,
    UserUpdateRole,
} from '@jerky/contracts';
import { UserEntity } from '../entities/user.entity';
import { USER } from '@jerky/constants';

@Injectable()
export class UserCommandsService {
    constructor(private readonly userRepository: UserRepository) {}

    public async create(dto: UserCreate.Request): Promise<User> {
        const { uuid, email, passwordHash, role } = await new UserEntity(
            dto.email,
            dto.passwordHash,
            dto.role,
        );
        const newUser = await this.userRepository.create(
            uuid,
            email,
            passwordHash,
            role,
        );
        if (!newUser) throw new BadRequestException('Cant create user');
        return newUser;
    }

    public async delete(uuid: string): Promise<User> {
        const deletedUser = await this.userRepository.delete(uuid);

        if (!deletedUser) throw new NotFoundException(USER.NOT_FOUND);

        return deletedUser;
    }

    public async updatePasswordHash({
        uuid,
        passwordHash,
    }: UserUpdatePasswordHash.Request): Promise<User> {
        // const userEntity = await new UserEntity().updatePassword(password);
        const updatedUser = await this.userRepository.updatePasswordHash(
            uuid,
            passwordHash,
        );
        if (!updatedUser) throw new NotFoundException(USER.NOT_FOUND);
        return updatedUser;
    }

    public async updateEmail({
        uuid,
        email,
    }: UserUpdateEmail.Request): Promise<User> {
        const userEntity = new UserEntity().updateEmail(email);
        const updatedUser = await this.userRepository.updateEmail(
            uuid,
            userEntity.email,
        );
        if (!updatedUser) throw new NotFoundException(USER.NOT_FOUND);
        return updatedUser;
    }

    public async updateRole(dto: UserUpdateRole.Request): Promise<User> {
        const userEntity = new UserEntity().updateRole(dto.role);
        const updatedUser = await this.userRepository.updateRole(
            dto.uuid,
            userEntity.role,
        );
        if (!updatedUser) throw new NotFoundException(USER.NOT_FOUND);
        return updatedUser;
    }
}
