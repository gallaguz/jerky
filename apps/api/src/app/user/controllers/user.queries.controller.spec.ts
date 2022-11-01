import { NestApplication } from '@nestjs/core';
import { RMQModule } from 'nestjs-rmq';
import {
    UserCreate,
    UserDelete,
    UserFindByEmail,
    UserFindByUuid,
    UserFindFiltered,
    UserHealthCheck,
} from '@jerky/contracts';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../../app.module';
import { ENVConfig, RMQConfig } from '../../../configs';
import { faker } from '@faker-js/faker';
import { UserCommandsController } from './user.commands.controller';
import { hashSync } from 'bcryptjs';
import * as request from 'supertest';
import { AnyExceptionFilter } from '../exeptions/any-exception.filter';
import { OrderBy } from '@jerky/interfaces';
import { ORDER_BY, SEARCH_STRING, SKIP, TAKE, USER } from '@jerky/constants';

let fakeUser: UserCreate.Request;
let createdInDbFakeUser: UserCreate.Response;

describe('[Api User] Query Controller', () => {
    let apiMicroservice: NestApplication;
    let userCommandsController: UserCommandsController;

    beforeAll(async () => {
        fakeUser = {
            email: faker.internet.email(),
            passwordHash: hashSync(faker.internet.password(), 10),
        };

        const apiModule: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forRootAsync(RMQConfig()),
                AppModule,
            ],
        }).compile();

        apiMicroservice = apiModule.createNestApplication();
        apiMicroservice.useGlobalFilters(new AnyExceptionFilter());

        userCommandsController = apiMicroservice.get<UserCommandsController>(
            UserCommandsController,
        );

        await apiMicroservice.init();

        createdInDbFakeUser = await userCommandsController.create(fakeUser);

        expect(createdInDbFakeUser).toBeDefined();
    });

    afterAll(async () => {
        if (createdInDbFakeUser) {
            await userCommandsController.delete(<UserDelete.Request>{
                uuid: createdInDbFakeUser.uuid,
            });
        }

        await apiMicroservice.close();
    });

    it('[GET /v1/user/ 200] /healthCheck ', function () {
        return request(apiMicroservice.getHttpServer())
            .get(`/v1/user/healthCheck`)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(<UserHealthCheck.Response>body.pong).toBeTruthy();
            });
    });

    describe('[SEARCH]', () => {
        describe('[UUID]', () => {
            it('[/GET 200] - correct uuid [expect:  user]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .get(`/v1/user/${createdInDbFakeUser.uuid}`)
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<UserFindByUuid.Response>body.uuid).toEqual(
                            createdInDbFakeUser.uuid,
                        );
                    });
            });

            it('[/GET 400]- wrong uuid [expect: User not found]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .get('/v1/user/6784df71-4dbc-4a5a-b1bf-7a35bdb5dc4e')
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(USER.NOT_FOUND);
                    });
            });

            it('[/GET 400] - not valid uuid [expect: uuid must be a valid UUID]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .get('/v1/user/42')
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(
                            'uuid must be a valid UUID',
                        );
                    });
            });

            it('[/GET 400] - not valid uuid [expect: uuid must be a valid UUID]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .get('/v1/user/042')
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(
                            'uuid must be a valid UUID',
                        );
                    });
            });

            it('[/GET 400] - not valid uuid [expect: uuid must be a valid UUID]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .get('/v1/user/not-valid-u-i-d')
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(
                            'uuid must be a valid UUID',
                        );
                    });
            });
        });

        describe('[EMAIL]', () => {
            it('[/POST 200] - correct email [expect: user]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .post('/v1/user/email')
                    .send(<UserFindByEmail.Request>{
                        email: createdInDbFakeUser.email,
                    })
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<UserFindByEmail.Response>body.email).toEqual(
                            createdInDbFakeUser.email,
                        );
                    });
            });

            it('[/POST 400] - wrong email [expect: User not found]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .post('/v1/user/email')
                    .send(<UserFindByEmail.Request>{
                        email: 'wrong@email.com',
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual(USER.NOT_FOUND);
                    });
            });

            it('[/POST 400] - not valid email [expect: email must be an email]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .post('/v1/user/email')
                    .send(<UserFindByEmail.Request>{
                        email: 'not.valid.email',
                    })
                    .expect(400)
                    .then(({ body }: request.Response) => {
                        expect(body.message).toEqual('email must be an email');
                    });
            });

            it('[/POST 400] - not valid email [expect: email must be an email]', async () => {
                return (
                    request(apiMicroservice.getHttpServer())
                        .post('/v1/user/email')
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        .send(<UserFindByEmail.Request>{
                            email: 42,
                        })
                        .expect(400)
                        .then(({ body }: request.Response) => {
                            expect(body.message).toEqual(
                                'email must be an email',
                            );
                        })
                );
            });
        });

        describe('[FILTERED]', () => {
            it('[/POST 200] find last created user [expect: user]', async () => {
                return request(apiMicroservice.getHttpServer())
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
                            createdInDbFakeUser.uuid,
                        );
                    });
            });

            it('[/POST 200] find by email [expect: user]', async () => {
                return request(apiMicroservice.getHttpServer())
                    .post('/v1/user/find')
                    .send(<UserFindFiltered.Request>{
                        searchString: createdInDbFakeUser.email,
                    })
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<UserFindFiltered.Response>body[0].uuid).toEqual(
                            createdInDbFakeUser.uuid,
                        );
                    });
            });

            it('[/POST 400] All params wrong [expect: 4 exception]', async () => {
                return (
                    request(apiMicroservice.getHttpServer())
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
