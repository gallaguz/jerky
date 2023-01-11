import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client/scripts/catalog-client';

@Injectable()
export class DatabaseErrorHandlerService {
    public handleError(error: unknown): Error {
        if (error instanceof Error) {
            if (error.message.includes('Record to delete does not exist')) {
                return new NotFoundException();
            }
            if (error.message.includes('Record to update not found'))
                return new NotFoundException();
            if (error.message.includes('Unique constraint failed'))
                return new ConflictException();
        }

        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            return new BadRequestException();
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') return new ConflictException();
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') return new NotFoundException();
        }
        if (error instanceof Prisma.PrismaClientInitializationError) {
            // 'Prisma connection failed'
            return new InternalServerErrorException();
        }
        if (error instanceof Prisma.PrismaClientRustPanicError) {
            // 'Underlying engine crashes and exits with a non-zero exit code. Restart Node'
            return new InternalServerErrorException();
        }
        if (error instanceof Prisma.PrismaClientValidationError) {
            // 'Prisma validation error'
            return new BadRequestException(error);
        }

        return new BadRequestException();
    }
}
