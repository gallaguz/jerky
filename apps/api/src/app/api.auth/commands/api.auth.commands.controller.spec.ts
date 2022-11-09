import { ITokenDecoded } from '@jerky/interfaces';
import { delay } from 'rxjs';
import {
    AuthLogin,
    AuthRefresh,
    AuthRegister,
    UserDelete,
} from '@jerky/contracts';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiAuthModule } from '../api.auth.module';
import { RMQModule } from 'nestjs-rmq';
import cookieParser = require('cookie-parser');
import { faker } from '@faker-js/faker';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ENVConfig, JWTConfig, RMQConfig } from '../../../configs';
import { EMAIL, PASSWORD, USER } from '@jerky/constants';

class FakeUserGodLikeEntity {
    private _api: INestApplication;
    private _jwtService: JwtService;
    private _configService: ConfigService;
    private _secrets: {
        accessTokenSecret: string;
        refreshTokenSecret: string;
    } = { accessTokenSecret: '', refreshTokenSecret: '' };

    private _uuid = '';
    private _credentials: { email: string; password: string } = {
        email: '',
        password: '',
    };

    private _tokens: {
        accessToken: string;
        refreshToken: string;
    } = { accessToken: '', refreshToken: '' };

    private _cookies = '';

    constructor(
        api: INestApplication,
        jwtService: JwtService,
        configService: ConfigService,
    ) {
        this._api = api;
        this._jwtService = jwtService;
        this._configService = configService;

        this._secrets.accessTokenSecret =
            this._configService.get('JWT_SECRET_ACCESS') ?? '';
        this._secrets.refreshTokenSecret =
            this._configService.get('JWT_SECRET_REFRESH') ?? '';

        this.setEmail();
        this.setPassword();

        return this;
    }

    public async register(): Promise<this> {
        await request(this._api.getHttpServer())
            .post('/v1/auth/register')
            .send(<AuthRegister.Request>{
                email: this._credentials.email,
                password: this._credentials.password,
            })
            .expect(201)
            .then(({ body, headers }: request.Response) => {
                const { accessToken, refreshToken } = <AuthLogin.Response>body;

                this._tokens.accessToken = accessToken;
                this._tokens.refreshToken = refreshToken;
                this._cookies = headers['set-cookie'];
            });

        this._uuid = await this.validateRefreshToken().then((res) => res.uuid);

        return this;
    }

    public async deleteCreatedUser(
        uuid?: string,
    ): Promise<UserDelete.Response> {
        const userUuidToDelete = uuid ?? this._uuid;
        return await request(this._api.getHttpServer())
            .delete(`/v1/user/${userUuidToDelete}`)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(<UserDelete.Response>body.uuid).toEqual(
                    userUuidToDelete,
                );
                return body;
            });
    }

    public async validateRefreshToken(
        refreshToken?: string,
    ): Promise<ITokenDecoded> {
        const tokenToValidate = refreshToken ?? this._tokens.refreshToken;
        return <ITokenDecoded>await this._jwtService.verifyAsync(
            tokenToValidate,
            {
                secret: this._secrets.refreshTokenSecret,
            },
        );
    }

    public async validateAccessToken(
        accessToken?: string,
    ): Promise<ITokenDecoded> {
        const tokenToValidate = accessToken ?? this._tokens.accessToken;
        return <ITokenDecoded>await this._jwtService.verifyAsync(
            tokenToValidate,
            {
                secret: this._secrets.accessTokenSecret,
            },
        );
    }

    public async setUuid(uuid?: string): Promise<this> {
        this._uuid =
            uuid ?? (await this.validateRefreshToken().then((res) => res.uuid));
        return this;
    }

    public setEmail(): this {
        this._credentials.email = faker.internet.email();
        return this;
    }

    public setPassword(): this {
        this._credentials.password = faker.internet.password();
        return this;
    }

    public setCookies(cookies: string): this {
        this._cookies = cookies;
        return this;
    }

    public setAccessToken(accessToken: string): this {
        this._tokens.accessToken = accessToken;
        return this;
    }

    public setRefreshToken(refreshToken: string): this {
        this._tokens.refreshToken = refreshToken;
        return this;
    }

    public get uuid(): string {
        return this._uuid;
    }

    public get cookies(): string {
        return this._cookies;
    }

    public get accessToken(): string {
        return this._tokens.accessToken;
    }

    public get refreshToken(): string {
        return this._tokens.refreshToken;
    }

    public get email(): string {
        return this._credentials.email;
    }

    public get password(): string {
        return this._credentials.password;
    }
}

const makePassword = (
    length: number,
    filler: number | string,
): number | string => {
    const password = [...Array(length).fill(filler)].join('');

    return typeof filler === 'number' ? Number(password) : String(password);
};

describe('[API AUTH Commands Controller]', () => {
    let apiAuth: INestApplication;
    let jwtService: JwtService;
    let configService: ConfigService;

    const createdFakeUsers: FakeUserGodLikeEntity[] = [];

    beforeAll(async () => {
        const apiModule: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forRootAsync(RMQConfig()),
                JwtModule.registerAsync(JWTConfig()),
                ApiAuthModule,
            ],
        }).compile();

        apiAuth = apiModule.createNestApplication();
        apiAuth.use(cookieParser());

        configService = apiAuth.get<ConfigService>(ConfigService);
        jwtService = apiAuth.get<JwtService>(JwtService);

        await apiAuth.init();
    });
    afterAll(async () => {
        for (const fakeUser of createdFakeUsers) {
            await fakeUser.deleteCreatedUser();
        }

        createdFakeUsers.length = 0;

        await delay(500);
        await apiAuth.close();
    });
    describe('[/v1/auth/register POST] [REGISTER]', () => {
        it('[/ POST] register user [success]', async () => {
            const newFakeUser = new FakeUserGodLikeEntity(
                apiAuth,
                jwtService,
                configService,
            );

            await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send(<AuthRegister.Request>{
                    email: newFakeUser.email,
                    password: newFakeUser.password,
                })
                .expect(201)
                .then(({ body }: request.Response) => {
                    const { accessToken, refreshToken } = <AuthLogin.Response>(
                        body
                    );
                    expect(accessToken).toBeDefined();
                    expect(refreshToken).toBeDefined();
                    newFakeUser.setAccessToken(accessToken);
                    newFakeUser.setRefreshToken(refreshToken);
                    newFakeUser.setUuid();
                });

            createdFakeUsers.push(newFakeUser);
        });
        it('[/ POST] not valid email (string) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send(<AuthRegister.Request>{
                    email: 'not.valid.email',
                    password: faker.internet.password(),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(body.message).toEqual(EMAIL.MUST_BE_A_VALID_EMAIL);
                });
        });
        it('[/ POST] not valid email (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: 42,
                    password: faker.internet.password(),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL),
                    ).toEqual(true);
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_STRING),
                    ).toEqual(true);
                });
        });
        it('[/ POST] to short password [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: makePassword(6, 'a'),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_LONGER),
                    ).toEqual(true);
                });
        });
        it('[/ POST] to long password > 64 (string) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: makePassword(65, 'a'),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_SHORTER),
                    ).toEqual(true);
                });
        });
        it('[/ POST] not valid password < 8 (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: makePassword(4, 4),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_LONGER),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_SHORTER),
                    ).toEqual(true);
                });
        });
        it('[/ POST] to long password > 64 (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: makePassword(4, 65),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_LONGER),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_SHORTER),
                    ).toEqual(true);
                });
        });
        it('[/ POST] not valid email & password (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: 42,
                    password: makePassword(4, 4),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_LONGER),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_SHORTER),
                    ).toEqual(true);
                });
        });
    });
    describe('[/v1/auth/login POST] [LOGIN]', () => {
        let fakeUserFotTestLogin: FakeUserGodLikeEntity;
        beforeAll(async () => {
            fakeUserFotTestLogin = await new FakeUserGodLikeEntity(
                apiAuth,
                jwtService,
                configService,
            ).register();
        });
        afterAll(async () => {
            const deletedFakeUser =
                await fakeUserFotTestLogin.deleteCreatedUser();
            expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestLogin.uuid);
        });
        it('[/v1/auth/login POST] correct credentials [success]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send(<AuthLogin.Request>{
                    email: fakeUserFotTestLogin.email,
                    password: fakeUserFotTestLogin.password,
                })
                .expect(200)
                .then(({ body, headers }: request.Response) => {
                    const { accessToken, refreshToken } = <AuthLogin.Response>(
                        body
                    );
                    expect(accessToken).toBeDefined();
                    expect(refreshToken).toBeDefined();
                    expect(headers['set-cookie']).toBeDefined();

                    fakeUserFotTestLogin.setAccessToken(body.accessToken);
                    fakeUserFotTestLogin.setRefreshToken(body.refreshToken);
                    fakeUserFotTestLogin.setCookies(headers['set-cookie']);
                });
        });
        it('[/v1/auth/login POST] wrong email [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send(<AuthLogin.Request>{
                    email: 'wrong@email.com',
                    password: fakeUserFotTestLogin.password,
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(body.message.includes(USER.NOT_FOUND)).toEqual(true);
                });
        });
        it('[/v1/auth/login POST] wrong password [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send(<AuthLogin.Request>{
                    email: fakeUserFotTestLogin.email,
                    password: makePassword(8, 'a'),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(body.message.includes(USER.WRONG_PASSWORD)).toEqual(
                        true,
                    );
                });
        });
        it('[/v1/auth/login POST] wrong email / password [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send(<AuthLogin.Request>{
                    email: 'wrong@email.com',
                    password: makePassword(8, 'a'),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(body.message.includes(USER.NOT_FOUND)).toEqual(true);
                });
        });
        it('[/v1/auth/login POST] not valid email (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: 42,
                    password: fakeUserFotTestLogin.password,
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL),
                    ).toEqual(true);
                });
        });
        it('[/v1/auth/login POST] not valid password (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: fakeUserFotTestLogin.email,
                    password: makePassword(8, 8),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_LONGER),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_SHORTER),
                    ).toEqual(true);
                });
        });
        it('[/v1/auth/login POST] not valid password < 8 (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: fakeUserFotTestLogin.email,
                    password: makePassword(4, 4),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_LONGER),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_SHORTER),
                    ).toEqual(true);
                });
        });
        it('[/v1/auth/login POST] not valid password > 64 (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: fakeUserFotTestLogin.email,
                    password: makePassword(65, 8),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_LONGER),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_SHORTER),
                    ).toEqual(true);
                });
        });
        it('[/v1/auth/login POST] not valid email / password (number) [failed]', async () => {
            await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: 42,
                    password: makePassword(8, 8),
                })
                .expect(401)
                .then(({ body }: request.Response) => {
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_A_STRING),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_LONGER),
                    ).toEqual(true);
                    expect(
                        body.message.includes(PASSWORD.MUST_BE_SHORTER),
                    ).toEqual(true);
                });
        });
    });
    describe('[/v1/auth/refresh GET] [REFRESH]', () => {
        let fakeUserFotTestRefresh: FakeUserGodLikeEntity;
        beforeAll(async () => {
            fakeUserFotTestRefresh = await new FakeUserGodLikeEntity(
                apiAuth,
                jwtService,
                configService,
            ).register();
        });
        afterAll(async () => {
            const deletedFakeUser =
                await fakeUserFotTestRefresh.deleteCreatedUser();
            expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestRefresh.uuid);
            // const { uuid } = await request(apiAuth.getHttpServer())
            //     .post('/v1/user/email')
            //     .send({ email: fakeUserFotTestRefresh.user.email })
            //     .expect(200)
            //     .then(
            //         ({ body }: request.Response) =>
            //             <UserFindByEmail.Response>body,
            //     );
            //
            // const res = await request(apiAuth.getHttpServer())
            //     .delete(`/v1/user/${uuid}`)
            //     .expect(200)
            //     .then(
            //         ({ body }: request.Response) => <UserDelete.Response>body,
            //     );
            //
            // expect(res.uuid === uuid).toEqual(true);
        });
        it('[/ GET] [success]', async () => {
            await request(apiAuth.getHttpServer())
                .get('/v1/auth/refresh')
                .set(
                    'Authorization',
                    `Bearer ${fakeUserFotTestRefresh.accessToken}`,
                )
                .set('Cookie', `${fakeUserFotTestRefresh.cookies}`)
                .expect(200)
                .then(({ body, headers }: request.Response) => {
                    expect(
                        <AuthRefresh.Response>body.accessToken,
                    ).toBeDefined();
                    expect(
                        <AuthRefresh.Response>body.refreshToken,
                    ).toBeDefined();

                    fakeUserFotTestRefresh
                        .validateAccessToken(body.accessToken)
                        .then((tokenDecoded: ITokenDecoded) => {
                            expect(tokenDecoded.uuid).toEqual(
                                fakeUserFotTestRefresh.uuid,
                            );
                            fakeUserFotTestRefresh.setAccessToken(
                                body.accessToken,
                            );
                        });

                    fakeUserFotTestRefresh
                        .validateRefreshToken(body.refreshToken)
                        .then((tokenDecoded: ITokenDecoded) => {
                            expect(tokenDecoded.uuid).toEqual(
                                fakeUserFotTestRefresh.uuid,
                            );
                            fakeUserFotTestRefresh.setAccessToken(
                                body.refreshToken,
                            );
                        });

                    expect(headers['set-cookie']).toBeDefined();
                    expect(
                        headers['set-cookie'][0].includes(body.refreshToken),
                    ).toEqual(true);
                    fakeUserFotTestRefresh.setCookies(headers['set-cookie']);
                });
        });
        it('[/ GET]', async () => {
            //
        });
    });
    describe('[LOGOUT]', () => {
        //
    });
});
