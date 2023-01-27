import {
    Prisma,
    PrismaClient,
    User,
    UserRole,
} from '@prisma/client/scripts/user-client';
import UserCreateInput = Prisma.UserCreateInput;
import { faker } from '@faker-js/faker';
import { genSaltSync, hashSync } from 'bcryptjs';
import * as process from 'process';

const prismaClient = new PrismaClient();
const hashPasswordSync = (
    password: string,
): {
    salt: string;
    passwordHash: string;
} => {
    const salt = genSaltSync(12);
    const passwordHash = hashSync(password, salt);
    return { salt, passwordHash };
};

const users: UserCreateInput[] = [];

for (let i = 0; i < 10; i++) {
    const { salt, passwordHash } = hashPasswordSync(faker.internet.password());
    const email = faker.internet.email();
    users.push({
        salt,
        passwordHash,
        email,
        role: UserRole.USER,
    });
}

users.push(
    ...[
        {
            ...hashPasswordSync('test'),
            email: 'test@test.com',
            role: UserRole.USER,
        },
        {
            ...hashPasswordSync('admin'),
            email: 'admin@admin.com',
            role: UserRole.ADMIN,
        },
    ],
);

const main = async (users: UserCreateInput[]): Promise<User[]> => {
    const createdUsers: User[] = [];

    for (const data of users) {
        createdUsers.push(await prismaClient.user.create({ data }));
    }

    return createdUsers;
};

export const seedUsers = async (): Promise<User[]> => {
    const start = performance.now();

    return await main(users)
        .catch(async (e) => {
            console.log(e);
            await prismaClient.$disconnect();
            process.exit(1);
        })
        .finally(async () => {
            await prismaClient.$disconnect().then(() => {
                const end = Math.floor(performance.now() - start);
                console.log(`--- Users Seeded in ${end} ms ---`);
            });
        });
};
