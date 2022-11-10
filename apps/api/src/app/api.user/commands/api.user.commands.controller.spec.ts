import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig, RMQConfig } from '../../../configs';
import { RMQModule } from 'nestjs-rmq';
import { ApiUserCommandsController } from './api.user.commands.controller';
import { NestApplication } from '@nestjs/core';
import { faker } from '@faker-js/faker';
import { UserCreate, UserDelete, UserUpdatePassword } from '@jerky/contracts';
import { IUser, Role } from '@jerky/interfaces';
import { delay } from 'rxjs';
import * as request from 'supertest';
import {
    EMAIL,
    PASSWORD,
    SOMETHING_WENT_WRONG,
    USER,
    UUID,
} from '@jerky/constants';
import { ApiUserModule } from '../api.user.module';

describe('API USER Commands Controller', () => {
    const createdUsers: IUser[] = [];

    let apiUser: NestApplication;
    let userCommandsController: ApiUserCommandsController;

    beforeAll(async () => {
        const apiModule: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forRootAsync(RMQConfig()),
                ApiUserModule,
            ],
        }).compile();

        apiUser = apiModule.createNestApplication();

        userCommandsController = apiUser.get<ApiUserCommandsController>(
            ApiUserCommandsController,
        );

        await apiUser.init();
    });

    afterAll(async () => {
        try {
            createdUsers.forEach((user) => {
                userCommandsController.delete(<UserDelete.Request>{
                    uuid: user.uuid,
                });
            });
        } catch (e) {
            throw new Error('Cant delete created fake users');
        }

        createdUsers.length = 0;

        await delay(500);
        await apiUser.close();
    });

    describe('[/v1/user CREATE]', () => {
        it('[/ POST] create user', async () => {
            const fakeUser: UserCreate.Request = {
                email: faker.internet.email(),
                password: faker.internet.password(),
            };

            const newCreatedUser = await request(apiUser.getHttpServer())
                .post('/v1/user')
                .send(<UserCreate.Request>{
                    email: fakeUser.email,
                    password: fakeUser.password,
                })
                .expect(201)
                .then(({ body }: request.Response) => {
                    expect(<UserCreate.Response>body.email).toEqual(
                        fakeUser.email,
                    );

                    return body;
                });

            createdUsers.push(newCreatedUser);
        });
        it('[/ POST] create user with role: USER', async () => {
            const fakeUser: UserCreate.Request = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: Role.USER,
            };

            const newCreatedUser = await request(apiUser.getHttpServer())
                .post('/v1/user')
                .send(<UserCreate.Request>{
                    email: fakeUser.email,
                    password: fakeUser.password,
                    role: fakeUser.role,
                })
                .expect(201)
                .then(({ body }: request.Response) => {
                    expect(<UserCreate.Response>body.email).toEqual(
                        fakeUser.email,
                    );

                    return body;
                });

            createdUsers.push(newCreatedUser);
        });
        it('[/ POST] create user with role: ADMIN', async () => {
            const fakeUser: UserCreate.Request = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: Role.ADMIN,
            };

            const newCreatedAdmin = await request(apiUser.getHttpServer())
                .post('/v1/user')
                .send(<UserCreate.Request>{
                    email: fakeUser.email,
                    password: fakeUser.password,
                    role: fakeUser.role,
                })
                .expect(201)
                .then(({ body }: request.Response) => {
                    expect(<UserCreate.Response>body.email).toEqual(
                        fakeUser.email,
                    );

                    return body;
                });

            createdUsers.push(newCreatedAdmin);
        });
        it('[/ POST] not valid email (string)', async () => {
            const fakeUser: UserCreate.Request = {
                email: 'not.valid.email',
                password: faker.internet.password(),
            };

            await request(apiUser.getHttpServer())
                .post('/v1/user')
                .send(<UserCreate.Request>{
                    email: fakeUser.email,
                    password: fakeUser.password,
                })
                .expect(400)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL),
                    ).toEqual(true);
                });
        });
        it('[/ POST] not valid email (number)', async () => {
            const fakeUser: UserCreate.Request = {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                email: 42,
                password: faker.internet.password(),
            };

            await request(apiUser.getHttpServer())
                .post('/v1/user')
                .send(<UserCreate.Request>{
                    email: fakeUser.email,
                    password: fakeUser.password,
                })
                .expect(400)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL),
                    ).toEqual(true);
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_STRING),
                    ).toEqual(true);
                });
        });
        it('[/ POST] user exist', async () => {
            const user = createdUsers.find((u) => u.role === Role.USER);
            if (!user) throw new Error(SOMETHING_WENT_WRONG);

            const fakeUser: UserCreate.Request = {
                email: user.email,
                password: faker.internet.password(),
            };

            await request(apiUser.getHttpServer())
                .post('/v1/user')
                .send(<UserCreate.Request>{
                    email: fakeUser.email,
                    password: fakeUser.password,
                })
                .expect(400)
                .then(({ body }: request.Response) => {
                    expect(body.message).toEqual(USER.USER_EXIST);
                });
        });
    });

    describe('[v1/user UPDATE]', () => {
        describe('[PASSWORD]', () => {
            it('[/ POST]', async () => {
                const user = createdUsers[0];
                if (!user) throw new Error(SOMETHING_WENT_WRONG);

                await request(apiUser.getHttpServer())
                    .patch('/v1/user/password')
                    .send(<UserUpdatePassword.Request>{
                        uuid: user.uuid,
                        password: faker.internet.password(),
                    })
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<UserUpdatePassword.Response>body.email).toEqual(
                            user.email,
                        );
                    });
            });
            it('[/ POST] wrong uuid', async () => {
                await request(apiUser.getHttpServer())
                    .patch('/v1/user/password')
                    .send(<UserUpdatePassword.Request>{
                        uuid: '6347b9fc-8127-4447-8338-eaeea8845889',
                        password: faker.internet.password(),
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(USER.NOT_FOUND);
                    });
            });
            it('[/ POST] not valid uuid (string uuid-like)', async () => {
                await request(apiUser.getHttpServer())
                    .patch('/v1/user/password')
                    .send(<UserUpdatePassword.Request>{
                        uuid: 'not-valid-u-u-id',
                        password: faker.internet.password(),
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(
                            body.message.includes(UUID.MUST_BE_A_VALID_UUID),
                        ).toEqual(true);
                    });
            });
            it('[/ POST] not valid uuid (string)', async () => {
                await request(apiUser.getHttpServer())
                    .patch('/v1/user/password')
                    .send(<UserUpdatePassword.Request>{
                        uuid: 'notValidUuid',
                        password: faker.internet.password(),
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(
                            body.message.includes(UUID.MUST_BE_A_VALID_UUID),
                        ).toEqual(true);
                    });
            });
            it('[/ POST] not valid uuid (number)', async () => {
                await request(apiUser.getHttpServer())
                    .patch('/v1/user/password')
                    .send({
                        uuid: 42,
                        password: faker.internet.password(),
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(
                            body.message.includes(UUID.MUST_BE_A_VALID_UUID),
                        ).toEqual(true);
                        expect(
                            body.message.includes(UUID.MUST_BE_A_STRING),
                        ).toEqual(true);
                    });
            });
            it('[/ POST] short password', async () => {
                const user = createdUsers[0];
                if (!user) throw new Error(SOMETHING_WENT_WRONG);

                await request(apiUser.getHttpServer())
                    .patch('/v1/user/password')
                    .send(<UserUpdatePassword.Request>{
                        uuid: user.uuid,
                        password: '1234567',
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(
                            body.message.includes(PASSWORD.MUST_BE_LONGER),
                        ).toEqual(true);
                    });
            });
            it('[/ POST] long password (64 * "a")', async () => {
                const user = createdUsers[0];
                if (!user) throw new Error(SOMETHING_WENT_WRONG);

                const longPassword = [...Array(65).fill('a')].join('');

                await request(apiUser.getHttpServer())
                    .patch('/v1/user/password')
                    .send(<UserUpdatePassword.Request>{
                        uuid: user.uuid,
                        password: longPassword,
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(
                            body.message.includes(PASSWORD.MUST_BE_SHORTER),
                        ).toEqual(true);
                    });
            });
            it('[/ POST] not valid password (number)', async () => {
                const user = createdUsers[0];
                if (!user) throw new Error(SOMETHING_WENT_WRONG);

                await request(apiUser.getHttpServer())
                    .patch('/v1/user/password')
                    .send({
                        uuid: user.uuid,
                        password: 42,
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(
                            body.message.includes(PASSWORD.MUST_BE_A_STRING),
                        ).toEqual(true);
                    });
            });
        });
        // describe('[EMAIL]', () => {
        //     it('', () => {
        //         //
        //     });
        //     it('', () => {
        //         //
        //     });
        //     it('', () => {
        //         //
        //     });
        // });
        // describe('[ROLE]', () => {
        //     it('', () => {
        //         //
        //     });
        //     it('', () => {
        //         //
        //     });
        //     it('', () => {
        //         //
        //     });
        // });
    });

    // describe('[DELETE]', () => {
    //     it('', () => {
    //         //
    //     });
    //     it('', () => {
    //         //
    //     });
    //     it('', () => {
    //         //
    //     });
    // });
});
