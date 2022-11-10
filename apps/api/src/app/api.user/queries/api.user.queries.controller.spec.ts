import { NestApplication } from '@nestjs/core';
import { RMQModule } from 'nestjs-rmq';
import {
    UserDelete,
    UserFindByEmail,
    UserFindByUuid,
    UserFindFiltered,
    UserHealthCheck,
} from '@jerky/contracts';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig, RMQConfig } from '../../../configs';
import { faker } from '@faker-js/faker';
import { ApiUserCommandsController } from '../commands/api.user.commands.controller';
import * as request from 'supertest';
import { IUser, OrderBy, Role } from '@jerky/interfaces';
import {
    ORDER_BY,
    SEARCH_STRING,
    SKIP,
    SOMETHING_WENT_WRONG,
    TAKE,
    USER,
} from '@jerky/constants';
import { delay } from 'rxjs';
import { ApiUserModule } from '../api.user.module';

const createdUsers: IUser[] = [];

describe('[Api User] Query Controller', () => {
    let apiUserMicroservice: NestApplication;
    let userCommandsController: ApiUserCommandsController;

    beforeAll(async () => {
        const fakeUser = {
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const apiModule: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forRootAsync(RMQConfig()),
                ApiUserModule,
            ],
        }).compile();

        apiUserMicroservice = apiModule.createNestApplication();

        userCommandsController =
            apiUserMicroservice.get<ApiUserCommandsController>(
                ApiUserCommandsController,
            );

        await apiUserMicroservice.init();

        createdUsers.push(await userCommandsController.create(fakeUser));
        expect(createdUsers.length).toEqual(1);
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
        await apiUserMicroservice.close();
    });

    it('[/v1/user/healthCheck GET] /healthCheck ', function () {
        return request(apiUserMicroservice.getHttpServer())
            .get(`/v1/user/healthCheck`)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(<UserHealthCheck.Response>body.pong).toBeTruthy();
            });
    });

    describe('[v1/user/ SEARCH]', () => {
        describe('[UUID]', () => {
            it('[/:uuid GET 200] - correct uuid [expect:  user]', async () => {
                const user = createdUsers.find((u) => u.role === Role.USER);
                if (!user) throw new Error(SOMETHING_WENT_WRONG);

                return request(apiUserMicroservice.getHttpServer())
                    .get(`/v1/user/${user.uuid}`)
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<UserFindByUuid.Response>body.uuid).toEqual(
                            user.uuid,
                        );
                    });
            });
            it('[/:uuid GET]- wrong uuid [expect: User not found]', async () => {
                return request(apiUserMicroservice.getHttpServer())
                    .get('/v1/user/6784df71-4dbc-4a5a-b1bf-7a35bdb5dc4e')
                    .expect(404)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(USER.NOT_FOUND);
                    });
            });
            it('[/:uuid GET] - not valid uuid [expect: uuid must be a valid UUID]', async () => {
                return request(apiUserMicroservice.getHttpServer())
                    .get('/v1/user/42')
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message[0]).toEqual(
                            'uuid must be a valid UUID',
                        );
                    });
            });
            it('[/:uuid GET] - not valid uuid [expect: uuid must be a valid UUID]', async () => {
                return request(apiUserMicroservice.getHttpServer())
                    .get('/v1/user/not-valid-u-i-d')
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message[0]).toEqual(
                            'uuid must be a valid UUID',
                        );
                    });
            });
        });

        describe('[v1/user/email EMAIL]', () => {
            it('[/ POST] - correct email [expect: user]', async () => {
                const user = createdUsers.find((u) => u.role === Role.USER);
                if (!user) throw new Error(SOMETHING_WENT_WRONG);

                return request(apiUserMicroservice.getHttpServer())
                    .post('/v1/user/email')
                    .send(<UserFindByEmail.Request>{
                        email: user.email,
                    })
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<UserFindByEmail.Response>body.email).toEqual(
                            user.email,
                        );
                    });
            });
            it('[/ POST] - wrong email [expect: User not found]', async () => {
                return request(apiUserMicroservice.getHttpServer())
                    .post('/v1/user/email')
                    .send(<UserFindByEmail.Request>{
                        email: 'wrong@email.com',
                    })
                    .expect(404)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(USER.NOT_FOUND);
                    });
            });
            it('[/ POST] - not valid email [expect: email must be an email]', async () => {
                return request(apiUserMicroservice.getHttpServer())
                    .post('/v1/user/email')
                    .send(<UserFindByEmail.Request>{
                        email: 'not.valid.email',
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message[0]).toEqual(
                            'email must be an email',
                        );
                    });
            });
            it('[/ POST] - not valid email [expect: email must be an email]', async () => {
                return (
                    request(apiUserMicroservice.getHttpServer())
                        .post('/v1/user/email')
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        .send(<UserFindByEmail.Request>{
                            email: 42,
                        })
                        // .expect(400)
                        .then(({ body }: request.Response) => {
                            expect(body.message[0]).toEqual(
                                'email must be an email',
                            );
                        })
                );
            });
        });

        describe('[v1/user/find FILTERED]', () => {
            it('[/ POST] find last created user [expect: user]', async () => {
                const user = createdUsers.find((u) => u.role === Role.USER);
                if (!user) throw new Error(SOMETHING_WENT_WRONG);

                return request(apiUserMicroservice.getHttpServer())
                    .post('/v1/user/find')
                    .send(<UserFindFiltered.Request>{
                        searchString: '',
                        skip: 0,
                        take: 1,
                        orderBy: OrderBy.DESC,
                    })
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<UserFindFiltered.Response>body[0].uuid).toEqual(
                            user.uuid,
                        );
                    });
            });
            it('[/ POST] find by email [expect: user]', async () => {
                const user = createdUsers.find((u) => u.role === Role.USER);
                if (!user) throw new Error(SOMETHING_WENT_WRONG);

                return request(apiUserMicroservice.getHttpServer())
                    .post('/v1/user/find')
                    .send(<UserFindFiltered.Request>{
                        searchString: user.email,
                    })
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<UserFindFiltered.Response>body[0].uuid).toEqual(
                            user.uuid,
                        );
                    });
            });
            it('[/ POST] find by wrong email [User not found]', async () => {
                return request(apiUserMicroservice.getHttpServer())
                    .post('/v1/user/find')
                    .send(<UserFindFiltered.Request>{
                        searchString: 'wrong@email.com',
                    })
                    .expect(404)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(USER.NOT_FOUND);
                    });
            });
            it('[/ POST] All params wrong [expect: 4 exception]', async () => {
                return (
                    request(apiUserMicroservice.getHttpServer())
                        .post('/v1/user/find')
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        .send(<UserFindFiltered.Request>{
                            searchString: 42,
                            orderBy: 'up',
                            take: 0,
                            skip: 'five',
                        })
                        .expect(400)
                        .then(({ body }: request.Response) => {
                            expect(
                                body.message.includes(
                                    SEARCH_STRING.MUST_BE_A_STRING,
                                ),
                            ).toEqual(true);
                            expect(
                                body.message.includes(
                                    ORDER_BY.MUST_BE_ASC_OD_DESC,
                                ),
                            ).toEqual(true);
                            expect(
                                body.message.includes(
                                    TAKE.MUST_NOT_BE_NO_LESS_THEN_1,
                                ),
                            ).toEqual(true);
                            expect(
                                body.message.includes(SKIP.MUST_BE_A_NUMBER),
                            ).toEqual(true);
                        })
                );
            });
        });
    });
});
