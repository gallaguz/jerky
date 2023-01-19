/**
 *
 * [ Required !!! ]
 *      authorization-microservice
 *      user-microservice
 * must RUN
 *
 */

import { faker } from '@faker-js/faker';
import { Generate, UUIDService } from '@jerky/common';
import { PASSWORD } from '@jerky/constants';
import {
    ExternalAuthHealthCheckQueryContract,
    ExternalAuthLoginCommandContract,
    ExternalAuthLogoutCommandContract,
    ExternalAuthRefreshCommandContract,
    ExternalAuthRegisterCommandContract,
    ExternalUserRemoveCommandContract,
} from '@jerky/contracts';
import {
    TTokenDecoded,
    TTokenOptions,
    TTokenPayload,
    TTokens,
    TUserCredentials,
} from '@jerky/interfaces';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client/scripts/user-client';
import * as cookieParser from 'cookie-parser';
import { RMQModule } from 'nestjs-rmq';
import * as request from 'supertest';

import { JwtConfig, RmqConfig } from '../../../configs';
import { ApiAuthController } from './api-auth-controller';
import { ApiAuthModule } from './api-auth-module';

type TTmpUser = {
    uuid?: string;
    credentials?: Partial<TUserCredentials>;
    tokens?: Partial<TTokens>;
    tokenPayload?: Partial<TTokenPayload>;
    tokenDecoded?: Partial<TTokenDecoded>;
};
const REGISTER_URL = '/auth/register';
const LOGIN_URL = '/auth/login';
const LOGOUT_URL = '/auth/logout';
const REFRESH_URL = '/auth/refresh';
const REMOVE_URL = '/auth';
const HEALTH_CHECK_URL = '/auth/healthCheck';
const HEALTH_CHECK_PROTECTED_URL = '/auth/healthCheckProtected';

class LoginRequest extends ExternalAuthLoginCommandContract.Request {}
type LoginResponse = ExternalAuthLoginCommandContract.Response;

class RegisterRequest extends ExternalAuthRegisterCommandContract.Request {}
type RegisterResponse = ExternalAuthRegisterCommandContract.Response;

class LogoutRequest extends ExternalAuthLogoutCommandContract.Request {}
type LogoutResponse = ExternalAuthLogoutCommandContract.Response;

class RefreshRequest extends ExternalAuthRefreshCommandContract.Request {}
type RefreshResponse = ExternalAuthRefreshCommandContract.Response;

class HealthCheckRequest extends ExternalAuthHealthCheckQueryContract.Request {}
type HealthCheckResponse = ExternalAuthHealthCheckQueryContract.Response;

class RemoveRequest extends ExternalUserRemoveCommandContract.Request {}
type RemoveResponse = ExternalUserRemoveCommandContract.Response;

describe('[ Auth API ]', () => {
    let app: INestApplication;
    let controller: ApiAuthController;
    let jwtService: JwtService;
    let configService: ConfigService;
    let uuidService: UUIDService;

    let jwtOptions: TTokenOptions;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ isGlobal: true }),
                RMQModule.forRootAsync(RmqConfig()),
                JwtModule.registerAsync(JwtConfig()),
                ApiAuthModule,
            ],
            providers: [UUIDService],
        }).compile();

        app = module.createNestApplication();
        app.use(cookieParser());

        controller = app.get<ApiAuthController>(ApiAuthController);
        configService = app.get<ConfigService>(ConfigService);
        jwtService = app.get<JwtService>(JwtService);
        uuidService = app.get<UUIDService>(UUIDService);

        await app.init();

        jwtOptions = {
            accessTokenSecret:
                configService.get<string>('JWT_SECRET_ACCESS') ?? '',
            refreshTokenSecret:
                configService.get<string>('JWT_SECRET_REFRESH') ?? '',
            accessTokenExpiresIn:
                configService.get<number>('JWT_ACCESS_EXP') ?? 42,
            refreshTokenExpiresIn:
                configService.get<number>('JWT_REFRESH_EXP') ?? 42,
        };
    });
    afterAll(async () => {
        await app.close();
    });

    /** ******************************************************************* **/

    it(`[ app ] toBeDefined`, function () {
        expect(app).toBeDefined();
    });
    it(`[ controller ] toBeDefined - success`, function () {
        expect(controller).toBeDefined();
    });
    it(`[ jwtService ] toBeDefined - success`, function () {
        expect(jwtService).toBeDefined();
    });
    it(`[ configService ] toBeDefined - success`, function () {
        expect(configService).toBeDefined();
    });
    it(`[ uuidService ] toBeDefined - success`, function () {
        expect(uuidService).toBeDefined();
    });

    /** ******************************************************************* **/

    const _tmpVault: TTmpUser[] = [];

    const _generateBaseProps = (): RegisterRequest => {
        return {
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: UserRole.USER,
        };
    };
    const _register = async (
        props?: RegisterRequest,
    ): Promise<RegisterResponse & { cookies: string }> => {
        return await request(app.getHttpServer())
            .post(REGISTER_URL)
            .send(props ?? _generateBaseProps())
            .then(({ body, headers }: request.Response) => {
                const { accessToken } = <RegisterResponse>body;
                const cookies = headers['set-cookie'];
                return {
                    accessToken,
                    cookies,
                };
            });
    };
    const _login = async (
        props: RegisterRequest,
    ): Promise<RegisterResponse & { cookies: string }> => {
        return await request(app.getHttpServer())
            .post(LOGIN_URL)
            .send(props)
            .then(({ body, headers }: request.Response) => {
                const { accessToken } = <RegisterResponse>body;
                const cookies = headers['set-cookie'];
                return {
                    accessToken,
                    cookies,
                };
            });
    };
    const _generateAccessToken = async (
        payload: TTokenPayload,
    ): Promise<string> => {
        return jwtService.signAsync(<TTokenPayload>payload, {
            secret: jwtOptions.accessTokenSecret,
            expiresIn: jwtOptions.accessTokenExpiresIn,
            jwtid: uuidService.getUuid(),
        });
    };
    const _generateExpiredAccessToken = async (
        payload: TTokenPayload,
    ): Promise<string> => {
        return jwtService.signAsync(<TTokenPayload>payload, {
            secret: jwtOptions.accessTokenSecret,
            expiresIn: -1,
            jwtid: uuidService.getUuid(),
        });
    };
    const _generateRefreshToken = async (
        payload: TTokenPayload,
    ): Promise<string> => {
        return jwtService.signAsync(<TTokenPayload>payload, {
            secret: jwtOptions.refreshTokenSecret,
            expiresIn: jwtOptions.refreshTokenExpiresIn,
            jwtid: uuidService.getUuid(),
        });
    };
    const _generateExpiredRefreshToken = async (
        payload: TTokenPayload,
    ): Promise<string> => {
        return jwtService.signAsync(<TTokenPayload>payload, {
            secret: jwtOptions.refreshTokenSecret,
            expiresIn: -1,
            jwtid: uuidService.getUuid(),
        });
    };
    const _validateAccessToken = async (
        accessToken: string,
    ): Promise<TTokenDecoded> => {
        return await jwtService.verifyAsync(accessToken, {
            secret: jwtOptions.accessTokenSecret,
        });
    };
    const _validateRefreshToken = async (
        accessToken: string,
    ): Promise<TTokenDecoded> => {
        return await jwtService.verifyAsync(accessToken, {
            secret: jwtOptions.refreshTokenSecret,
        });
    };
    const _decodeToken = (token: string): TTokenDecoded | null => {
        return <TTokenDecoded>jwtService.decode(token);
    };
    const _pushToTmpVault = (
        tmpProps: RegisterRequest,
        tokens: Partial<TTokens>,
    ): void => {
        const decoded: TTokenDecoded | null = _decodeToken(
            <string>tokens.accessToken ?? tokens.refreshToken,
        );

        _tmpVault.push({
            uuid: decoded?.uuid,
            credentials: {
                email: tmpProps.email,
                password: tmpProps.password,
                role: tmpProps.role,
            },
            tokens,
        });
    };

    const _removeCreatedUser = async (
        uuid: string,
        cookies: string,
        accessToken: string,
    ): Promise<RemoveResponse> => {
        return await request(app.getHttpServer())
            .delete(`${REMOVE_URL}/${uuid}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Cookie', `${cookies}`)
            .expect(200)
            .then(({ body }: request.Response) => {
                const { uuid } = <RemoveResponse>body;
                expect(uuid).toEqual(uuid);
                return body;
            });
    };

    const _validateCookies = (cookies: string): boolean => {
        const expires = cookies
            .split('; ')
            .filter((el) => el.includes('Expires'))[0]
            .split('=')[1];
        const currTime = new Date().getTime();
        const expTime = new Date(expires).getTime();
        return expTime - currTime > 0;
    };
    describe(`healthCheck`, () => {
        describe(`[ GET ${HEALTH_CHECK_URL} ]`, () => {
            it(`expect success`, async () => {
                await request(app.getHttpServer())
                    .get(HEALTH_CHECK_URL)
                    .send(<HealthCheckRequest>{
                        ping: false,
                    })
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<HealthCheckResponse>body.pong).toEqual(true);
                    });
            });
        });
        describe(`[ GET ${HEALTH_CHECK_PROTECTED_URL} ]`, () => {
            it(`expect success`, async () => {
                const tmpProps: RegisterRequest = _generateBaseProps();
                const { accessToken } = await _register(tmpProps);

                _pushToTmpVault(tmpProps, { accessToken });

                await request(app.getHttpServer())
                    .get(HEALTH_CHECK_PROTECTED_URL)
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send(<HealthCheckRequest>{
                        ping: false,
                    })
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        expect(<HealthCheckResponse>body.pong).toEqual(true);
                    });
            });
        });
    });
    describe(`registration`, () => {
        describe(`[ POST ${REGISTER_URL} ]`, () => {
            describe(`correct props`, () => {
                it('[ expect success', async () => {
                    const tmpProps: RegisterRequest = _generateBaseProps();

                    await request(app.getHttpServer())
                        .post(REGISTER_URL)
                        .send(tmpProps)
                        .expect(201)
                        .then(({ body, headers }: request.Response) => {
                            const { accessToken } = <RegisterResponse>body;
                            expect(accessToken).toBeDefined();
                            expect(headers['set-cookie']).toBeDefined();
                            expect(
                                _validateCookies(headers['set-cookie'][0]),
                            ).toEqual(true);

                            _pushToTmpVault(tmpProps, { accessToken });
                        });
                });
            });
            describe(`validation`, () => {
                it('not valid email (string)', async () => {
                    const tmpProps: RegisterRequest = {
                        ..._generateBaseProps(),
                        email: 'non.valid.email',
                    };
                    await request(app.getHttpServer())
                        .post(REGISTER_URL)
                        .send(tmpProps)
                        .expect(400);
                });
                it('not valid email (number)', async () => {
                    const tmpProps: RegisterRequest = {
                        ..._generateBaseProps(),
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        email: 42,
                    };
                    await request(app.getHttpServer())
                        .post(REGISTER_URL)
                        .send(tmpProps)
                        .expect(400);
                });
                it('not valid password (number)', async () => {
                    const tmpProps: RegisterRequest = {
                        ..._generateBaseProps(),
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        password: <number>(
                            Generate.string(
                                (PASSWORD.MAX + PASSWORD.MIN) / 2,
                                4,
                            )
                        ),
                    };
                    await request(app.getHttpServer())
                        .post(REGISTER_URL)
                        .send(tmpProps)
                        .expect(400);
                });
                it(`to short < password ${PASSWORD.MIN}`, async () => {
                    const tmpProps: RegisterRequest = {
                        ..._generateBaseProps(),
                        password: <string>(
                            Generate.string(PASSWORD.MIN - 1, 'a')
                        ),
                    };
                    await request(app.getHttpServer())
                        .post(REGISTER_URL)
                        .send(tmpProps)
                        .expect(400);
                });
                it(`to long password > ${PASSWORD.MAX}`, async () => {
                    const tmpProps: RegisterRequest = {
                        ..._generateBaseProps(),
                        password: <string>(
                            Generate.string(PASSWORD.MAX + 1, 'a')
                        ),
                    };
                    await request(app.getHttpServer())
                        .post(REGISTER_URL)
                        .send(tmpProps)
                        .expect(400);
                });
                // it('[/ POST] not valid password < 8 (number) [failed]', async () => {
                //     const body = await request(app.getHttpServer())
                //         .post('/v1/auth/register')
                //         .send({
                //             email: faker.internet.email(),
                //             password: makePassword(4, 4),
                //         })
                //         .expect(401)
                //         .then(({ body }: request.Response) => body);
                //
                //     expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                //         true,
                //     );
                //     expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                //         true,
                //     );
                //     expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                //         true,
                //     );
                // });
                // it('[/ POST] to long password > 64 (number) [failed]', async () => {
                //     const body = await request(app.getHttpServer())
                //         .post('/v1/auth/register')
                //         .send({
                //             email: faker.internet.email(),
                //             password: makePassword(4, 65),
                //         })
                //         .expect(401)
                //         .then(({ body }: request.Response) => body);
                //
                //     expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                //         true,
                //     );
                //     expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                //         true,
                //     );
                //     expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                //         true,
                //     );
                // });
                // it('[/ POST] not valid email & password (number, number) [failed]', async () => {
                //     const body = await request(app.getHttpServer())
                //         .post('/v1/auth/register')
                //         .send({
                //             email: 42,
                //             password: makePassword(4, 4),
                //         })
                //         .expect(401)
                //         .then(({ body }: request.Response) => body);
                //
                //     expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
                //     expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
                //         true,
                //     );
                //     expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                //         true,
                //     );
                //     expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                //         true,
                //     );
                //     expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                //         true,
                //     );
                // });
            });
        });
    });
    describe(`login`, () => {
        describe(`[ POST ${LOGOUT_URL} ]`, () => {
            describe(`correct props`, () => {
                it(`expect success`, async () => {
                    const tmpProps: RegisterRequest = _generateBaseProps();
                    const { accessToken } = await _register(tmpProps);

                    _pushToTmpVault(tmpProps, { accessToken });

                    await request(app.getHttpServer())
                        .post(LOGIN_URL)
                        .send({
                            email: tmpProps.email,
                            password: tmpProps.password,
                        })
                        .expect(200)
                        .then(({ body, headers }: request.Response) => {
                            const { accessToken } = <RegisterResponse>body;
                            expect(accessToken).toBeDefined();
                            expect(headers['set-cookie']).toBeDefined();
                            expect(
                                _validateCookies(headers['set-cookie'][0]),
                            ).toEqual(true);
                        });
                });
            });
            describe(`validation`, () => {
                //
            });
        });
    });
    describe(`logout`, () => {
        describe(`[ GET ${LOGOUT_URL} ]`, () => {
            describe(`correct props`, () => {
                it(`expect success`, async () => {
                    const tmpProps: RegisterRequest = _generateBaseProps();
                    const { accessToken, cookies } = await _register(tmpProps);

                    _pushToTmpVault(tmpProps, { accessToken });

                    await request(app.getHttpServer())
                        .get(LOGOUT_URL)
                        .set('Cookie', `${cookies}`)
                        .expect(401)
                        .then(({ body, headers }: request.Response) => {
                            const { logout } = <LogoutResponse>body;
                            expect(logout).toEqual(true);
                            expect(headers['set-cookie']).toBeDefined();
                            expect(
                                _validateCookies(headers['set-cookie'][0]),
                            ).toEqual(false);
                        });
                });
            });
            describe(`validation`, () => {
                //
            });
        });
    });
    describe(`refresh`, () => {
        describe(`[ GET ${REFRESH_URL} ]`, () => {
            describe(`correct props`, () => {
                it(`expect success`, async () => {
                    const tmpProps: RegisterRequest = _generateBaseProps();
                    const { accessToken, cookies } = await _register(tmpProps);

                    _pushToTmpVault(tmpProps, { accessToken });

                    await request(app.getHttpServer())
                        .get(REFRESH_URL)
                        .set('Cookie', `${cookies}`)
                        .expect(200)
                        .then(({ body }: request.Response) => {
                            const { accessToken } = <RefreshResponse>body;
                            expect(accessToken).toBeDefined();
                        });
                });
            });
            describe(`validation`, () => {
                //
            });
        });
    });
    describe(`remove`, () => {
        describe(`[ DELETE ${REMOVE_URL}]`, () => {
            it(`expect success`, async () => {
                const tmpProps: RegisterRequest = {
                    ..._generateBaseProps(),
                    role: UserRole.ADMIN,
                };
                const { accessToken, cookies } = await _register(tmpProps);

                const decoded = _decodeToken(accessToken);

                await request(app.getHttpServer())
                    .delete(`${REMOVE_URL}/${decoded?.uuid}`)
                    .set('Authorization', `Bearer ${accessToken}`)
                    .set('Cookie', `${cookies}`)
                    .expect(200)
                    .then(({ body }: request.Response) => {
                        const { uuid } = <RemoveResponse>body;
                        expect(uuid).toEqual(decoded?.uuid);
                    });
            });
        });
    });
    describe(`[ CleanUp ]`, () => {
        it(`Remove All created records`, async () => {
            const tmpProps = {
                ..._generateBaseProps(),
                role: UserRole.ADMIN,
            };
            const { accessToken, cookies } = await _register(tmpProps);
            const decoded = _decodeToken(accessToken);

            for (const el of _tmpVault) {
                await _removeCreatedUser(<string>el.uuid, cookies, accessToken);
            }

            await _removeCreatedUser(
                <string>decoded?.uuid,
                cookies,
                accessToken,
            );
        });
    });

    // describe('[/v1/auth/login POST] [LOGIN]', () => {
    //     let fakeUserFotTestLogin: FakeUserGodLikeEntity;
    //     beforeAll(async () => {
    //         fakeUserFotTestLogin = await new FakeUserGodLikeEntity(
    //             app,
    //             jwtService,
    //             configService,
    //             uuidService,
    //         ).register();
    //     });
    //     afterAll(async () => {
    //         const deletedFakeUser =
    //             await fakeUserFotTestLogin.deleteCreatedUser();
    //         expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestLogin.uuid);
    //     });
    //     it('[/ POST] correct credentials [success]', async () => {
    //         const { body, headers } = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send(<HttpLogin.Request>{
    //                 email: fakeUserFotTestLogin.email,
    //                 password: fakeUserFotTestLogin.password,
    //             })
    //             .expect(200)
    //             .then((res: request.Response) => res);
    //
    //         const { accessToken } = <HttpLogin.Response>body;
    //         expect(accessToken).toBeDefined();
    //         expect(headers['set-cookie']).toBeDefined();
    //
    //         fakeUserFotTestLogin.setAccessToken(accessToken);
    //         fakeUserFotTestLogin.setCookies(headers['set-cookie']);
    //     });
    //     it('[/ POST] wrong email (string) [failed]', async () => {
    //         const body = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send(<HttpLogin.Request>{
    //                 email: 'wrong@email.com',
    //                 password: fakeUserFotTestLogin.password,
    //             })
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message.includes(USER.NOT_FOUND)).toEqual(true);
    //     });
    //     it('[/ POST] wrong password (string) [failed]', async () => {
    //         const body = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send(<HttpLogin.Request>{
    //                 email: fakeUserFotTestLogin.email,
    //                 password: makePassword(8, 'a'),
    //             })
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message.includes(USER.WRONG_PASSWORD)).toEqual(true);
    //     });
    //     it('[/ POST] wrong email / password (string, string) [failed]', async () => {
    //         const body = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send(<HttpLogin.Request>{
    //                 email: 'wrong@email.com',
    //                 password: makePassword(8, 'a'),
    //             })
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message.includes(USER.NOT_FOUND)).toEqual(true);
    //     });
    //     it('[/ POST] not valid email (number) [failed]', async () => {
    //         const body = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send({
    //                 email: 42,
    //                 password: fakeUserFotTestLogin.password,
    //             })
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
    //         expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
    //             true,
    //         );
    //     });
    //     it('[/ POST] not valid password (number) [failed]', async () => {
    //         const body = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send({
    //                 email: fakeUserFotTestLogin.email,
    //                 password: makePassword(8, 8),
    //             })
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
    //             true,
    //         );
    //     });
    //     it('[/ POST] not valid password < 8 (number) [failed]', async () => {
    //         const body = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send({
    //                 email: fakeUserFotTestLogin.email,
    //                 password: makePassword(4, 4),
    //             })
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
    //             true,
    //         );
    //     });
    //     it('[/ POST] not valid password > 64 (number) [failed]', async () => {
    //         const body = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send({
    //                 email: fakeUserFotTestLogin.email,
    //                 password: makePassword(65, 8),
    //             })
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
    //             true,
    //         );
    //     });
    //     it('[/ POST] not valid email / password (number, number) [failed]', async () => {
    //         const body = await request(app.getHttpServer())
    //             .post('/v1/auth/login')
    //             .send({
    //                 email: 42,
    //                 password: makePassword(8, 8),
    //             })
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
    //         expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
    //             true,
    //         );
    //         expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
    //             true,
    //         );
    //     });
    // });
    // describe('[/v1/auth/refresh GET] [REFRESH]', () => {
    //     let fakeUserFotTestRefresh: FakeUserGodLikeEntity;
    //     beforeAll(async () => {
    //         fakeUserFotTestRefresh = await new FakeUserGodLikeEntity(
    //             app,
    //             jwtService,
    //             configService,
    //             uuidService,
    //         ).register();
    //     });
    //     afterAll(async () => {
    //         const deletedFakeUser =
    //             await fakeUserFotTestRefresh.deleteCreatedUser();
    //         expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestRefresh.uuid);
    //     });
    //     it('[/ GET] [success]', async () => {
    //         const { body } = await request(app.getHttpServer())
    //             .get('/v1/auth/refresh')
    //             .set(
    //                 'Authorization',
    //                 `Bearer ${fakeUserFotTestRefresh.accessToken}`,
    //             )
    //             .set('Cookie', `${fakeUserFotTestRefresh.cookies}`)
    //             .expect(200)
    //             .then((res: request.Response) => res);
    //
    //         expect(<HttpRefresh.Response>body.accessToken).toBeDefined();
    //
    //         fakeUserFotTestRefresh
    //             .validateAccessToken(body.accessToken)
    //             .then((tokenDecoded: ITokenDecoded) => {
    //                 expect(tokenDecoded.uuid).toEqual(
    //                     fakeUserFotTestRefresh.uuid,
    //                 );
    //                 fakeUserFotTestRefresh.setAccessToken(body.accessToken);
    //             });
    //     });
    //     it('[/ GET] expired accessToken [failed]', async () => {
    //         const expiredAccessToken =
    //             await fakeUserFotTestRefresh.generateExpiredAccessToken();
    //
    //         const { body } = await request(app.getHttpServer())
    //             .get('/v1/auth/refresh')
    //             .set('Authorization', `Bearer ${expiredAccessToken}`)
    //             .set('Cookie', `${fakeUserFotTestRefresh.cookies}`)
    //             .expect(401)
    //             .then((res: request.Response) => res);
    //
    //         expect(body.message).toEqual(USER.UNAUTHORIZED);
    //     });
    //     it('[/ GET] expired refreshToken [failed]', async () => {
    //         const expiredRefreshToken =
    //             await fakeUserFotTestRefresh.generateExpiredRefreshToken();
    //
    //         const { body } = await request(app.getHttpServer())
    //             .get('/v1/auth/refresh')
    //             .set(
    //                 'Authorization',
    //                 `Bearer ${fakeUserFotTestRefresh.accessToken}`,
    //             )
    //             .set('Cookie', `refreshToken=${expiredRefreshToken}`)
    //             .expect(401)
    //             .then((res: request.Response) => res);
    //
    //         expect(body.message).toEqual(JWT.EXPIRED);
    //     });
    // });
    // describe('[/v1/auth/logout GET] [LOGOUT]', () => {
    //     let fakeUserFotTestLogout: FakeUserGodLikeEntity;
    //     beforeAll(async () => {
    //         fakeUserFotTestLogout = await new FakeUserGodLikeEntity(
    //             app,
    //             jwtService,
    //             configService,
    //             uuidService,
    //         ).register();
    //     });
    //     afterAll(async () => {
    //         const deletedFakeUser =
    //             await fakeUserFotTestLogout.deleteCreatedUser();
    //         expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestLogout.uuid);
    //     });
    //     it('[/ GET] [success] ', async () => {
    //         const body = await request(app.getHttpServer())
    //             .get('/v1/auth/logout')
    //             .set(
    //                 'Authorization',
    //                 `Bearer ${fakeUserFotTestLogout.accessToken}`,
    //             )
    //             .set('Cookie', `${fakeUserFotTestLogout.cookies}`)
    //             .expect(401)
    //             .then(({ body }: request.Response) => body);
    //
    //         expect(body.message).toEqual(USER.UNAUTHORIZED);
    //     });
    //     it('[/ GET] expired accessToken [failed]', async () => {
    //         const expiredAccessToken =
    //             await fakeUserFotTestLogout.generateExpiredAccessToken();
    //
    //         const { body } = await request(app.getHttpServer())
    //             .get('/v1/auth/logout')
    //             .set('Authorization', `Bearer ${expiredAccessToken}`)
    //             .set('Cookie', `${fakeUserFotTestLogout.cookies}`)
    //             .expect(401)
    //             .then((res: request.Response) => res);
    //
    //         expect(body.message).toEqual(USER.UNAUTHORIZED);
    //     });
    //     it('[/ GET] expired refreshToken [failed]', async () => {
    //         const expiredRefreshToken =
    //             await fakeUserFotTestLogout.generateExpiredRefreshToken();
    //
    //         const { body } = await request(app.getHttpServer())
    //             .get('/v1/auth/logout')
    //             .set(
    //                 'Authorization',
    //                 `Bearer ${fakeUserFotTestLogout.accessToken}`,
    //             )
    //             .set('Cookie', `refreshToken=${expiredRefreshToken}`)
    //             .expect(401)
    //             .then((res: request.Response) => res);
    //
    //         expect(body.message).toEqual(JWT.EXPIRED);
    //     });
    // });
});

// import {
//     ExternalAuthLoginCommandContract,
//     ExternalAuthRefreshCommandContract,
//     ExternalAuthRegisterCommandContract,
//     UserRemove,
// } from '@jerky/contracts';
// import { ITokenDecoded, ITokenPayload } from '@jerky/interfaces';
// import { INestApplication } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { Test, TestingModule } from '@nestjs/testing';
// import { RMQModule } from 'nestjs-rmq';
// import { delay } from 'rxjs';
// import * as request from 'supertest';
//
// import { ApiAuthModule } from '../api.auth.module';
// import cookieParser = require('cookie-parser');
// import { faker } from '@faker-js/faker';
// import { ERROR_MESSAGES } from '@jerky/constants';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { Role } from '@prisma/client/scripts/user-client';
// import { WinstonModule } from 'nest-winston';
//
// import { ENVConfig, JWTConfig, RMQConfig } from '../../../configs';
// import { WinstonConfig } from '../../../configs/winston.config';
// import { UUUIDService } from '../../common/uuid.service';
// import PASSWORD = ERROR_MESSAGES.PASSWORD;
// import JWT = ERROR_MESSAGES.JWT;
// import EMAIL = ERROR_MESSAGES.EMAIL;
// import USER = ERROR_MESSAGES.USER;
//
// class FakeUserGodLikeEntity {
//     private _api: INestApplication;
//     private _jwtService: JwtService;
//     private _configService: ConfigService;
//     private _uuidService: UUUIDService;
//     private _secrets: {
//         accessTokenSecret: string;
//         refreshTokenSecret: string;
//     } = { accessTokenSecret: '', refreshTokenSecret: '' };
//
//     private _uuid = '';
//     private _credentials: { email: string; password: string } = {
//         email: '',
//         password: '',
//     };
//
//     private _tokens: {
//         accessToken: string;
//         refreshToken: string;
//     } = { accessToken: '', refreshToken: '' };
//
//     private _cookies = '';
//
//     constructor(
//         api: INestApplication,
//         jwtService: JwtService,
//         configService: ConfigService,
//         uuidService: UUUIDService,
//     ) {
//         this._api = api;
//         this._jwtService = jwtService;
//         this._configService = configService;
//         this._uuidService = uuidService;
//
//         this._secrets.accessTokenSecret =
//             this._configService.get('JWT_SECRET_ACCESS') ?? '';
//         this._secrets.refreshTokenSecret =
//             this._configService.get('JWT_SECRET_REFRESH') ?? '';
//
//         this.setEmail();
//         this.setPassword();
//
//         return this;
//     }
//
//     public async register(): Promise<this> {
//         const { body, headers } = await request(this._api.getHttpServer())
//             .post('/v1/auth/register')
//             .send(<ExternalAuthRegisterCommandContract.Request>{
//                 email: this._credentials.email,
//                 password: this._credentials.password,
//             })
//             .expect(201)
//             .then((res: request.Response) => res);
//
//         const { accessToken } = <ExternalAuthRegisterCommandContract.Response>(
//             body
//         );
//
//         this._tokens.accessToken = accessToken;
//         this._cookies = headers['set-cookie'];
//         this._uuid = await this.validateAccessToken().then((res) => res.uuid);
//
//         return this;
//     }
//
//     public async deleteCreatedUser(
//         uuid?: string,
//     ): Promise<UserRemove.Response> {
//         const userUuidToDelete = uuid ?? this._uuid;
//         return await request(this._api.getHttpServer())
//             .delete(`/v1/user/${userUuidToDelete}`)
//             .expect(200)
//             .then(({ body }: request.Response) => {
//                 expect(<UserRemove.Response>body.uuid).toEqual(
//                     userUuidToDelete,
//                 );
//                 return body;
//             });
//     }
//
//     public async generateAccessToken(
//         uuid: string,
//         role: Role,
//     ): Promise<string> {
//         return await this._jwtService.signAsync(<ITokenPayload>{ uuid, role }, {
//             secret: this._configService.get('JWT_SECRET_ACCESS'),
//             expiresIn: Number(this._configService.get('JWT_ACCESS_EXP')),
//             jwtid: this._uuidService.getUuid(),
//         });
//     }
//
//     public async generateExpiredAccessToken(): Promise<string> {
//         return await this._jwtService.signAsync(
//             <ITokenPayload>{ uuid: this._uuid, role: Role.USER },
//             {
//                 secret: this._configService.get('JWT_SECRET_ACCESS'),
//                 expiresIn: -1,
//                 jwtid: this._uuidService.getUuid(),
//             },
//         );
//     }
//
//     public async generateRefreshToken(
//         uuid: string,
//         role: Role,
//     ): Promise<string> {
//         return await this._jwtService.signAsync(<ITokenPayload>{ uuid, role }, {
//             secret: this._configService.get('JWT_SECRET_REFRESH'),
//             expiresIn: Number(this._configService.get('JWT_REFRESH_EXP')),
//             jwtid: this._uuidService.getUuid(),
//         });
//     }
//
//     public async generateExpiredRefreshToken(): Promise<string> {
//         return await this._jwtService.signAsync(
//             <ITokenPayload>{ uuid: this._uuid, role: Role.USER },
//             {
//                 secret: this._configService.get('JWT_SECRET_REFRESH'),
//                 expiresIn: -1,
//                 jwtid: this._uuidService.getUuid(),
//             },
//         );
//     }
//
//     public async validateRefreshToken(
//         refreshToken?: string,
//     ): Promise<ITokenDecoded> {
//         const tokenToValidate = refreshToken ?? this._tokens.refreshToken;
//         return <ITokenDecoded>await this._jwtService.verifyAsync(
//             tokenToValidate,
//             {
//                 secret: this._secrets.refreshTokenSecret,
//             },
//         );
//     }
//
//     public async validateAccessToken(
//         accessToken?: string,
//     ): Promise<ITokenDecoded> {
//         const tokenToValidate = accessToken ?? this._tokens.accessToken;
//         return <ITokenDecoded>await this._jwtService.verifyAsync(
//             tokenToValidate,
//             {
//                 secret: this._secrets.accessTokenSecret,
//             },
//         );
//     }
//
//     public async setUuid(uuid?: string): Promise<this> {
//         this._uuid =
//             uuid ?? (await this.validateAccessToken().then((res) => res.uuid));
//         return this;
//     }
//
//     public setEmail(): this {
//         this._credentials.email = faker.internet.email();
//         return this;
//     }
//
//     public setPassword(): this {
//         this._credentials.password = faker.internet.password();
//         return this;
//     }
//
//     public setCookies(cookies: string): this {
//         this._cookies = cookies;
//         return this;
//     }
//
//     public setAccessToken(accessToken: string): this {
//         this._tokens.accessToken = accessToken;
//         return this;
//     }
//
//     public setRefreshToken(refreshToken: string): this {
//         this._tokens.refreshToken = refreshToken;
//         return this;
//     }
//
//     public get uuid(): string {
//         return this._uuid;
//     }
//
//     public get cookies(): string {
//         return this._cookies;
//     }
//
//     public get accessToken(): string {
//         return this._tokens.accessToken;
//     }
//
//     public get refreshToken(): string {
//         return this._tokens.refreshToken;
//     }
//
//     public get email(): string {
//         return this._credentials.email;
//     }
//
//     public get password(): string {
//         return this._credentials.password;
//     }
// }
//
// const makePassword = (
//     length: number,
//     filler: number | string,
// ): number | string => {
//     const password = [...Array(length).fill(filler)].join('');
//
//     return typeof filler === 'number' ? Number(password) : String(password);
// };
//
// describe('[API AUTH Commands Controller]', () => {
//     let apiAuth: INestApplication;
//     let jwtService: JwtService;
//     let configService: ConfigService;
//     let uuidService: UUUIDService;
//
//     beforeAll(async () => {
//         const apiModule: TestingModule = await Test.createTestingModule({
//             imports: [
//                 ConfigModule.forRoot(ENVConfig()),
//                 RMQModule.forRootAsync(RMQConfig()),
//                 JwtModule.registerAsync(JWTConfig()),
//                 ApiAuthModule,
//                 WinstonModule.forRootAsync(WinstonConfig('API')),
//             ],
//         }).compile();
//
//         apiAuth = apiModule.createNestApplication();
//         apiAuth.use(cookieParser());
//
//         configService = apiAuth.get<ConfigService>(ConfigService);
//         jwtService = apiAuth.get<JwtService>(JwtService);
//         uuidService = apiAuth.get<UUUIDService>(UUUIDService);
//
//         await apiAuth.init();
//     });
//     afterAll(async () => {
//         await delay(500);
//         await apiAuth.close();
//     });
//     describe('[/v1/auth/register POST] [REGISTER]', () => {
//         const createdFakeUsers: FakeUserGodLikeEntity[] = [];
//         beforeAll(async () => {
//             //
//         });
//         afterAll(async () => {
//             for (const fakeUser of createdFakeUsers) {
//                 await fakeUser.deleteCreatedUser();
//             }
//
//             createdFakeUsers.length = 0;
//         });
//         it('[/ POST] register user [success]', async () => {
//             const newFakeUser = new FakeUserGodLikeEntity(
//                 apiAuth,
//                 jwtService,
//                 configService,
//                 uuidService,
//             );
//
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/register')
//                 .send(<ExternalAuthRegisterCommandContract.Request>{
//                     email: newFakeUser.email,
//                     password: newFakeUser.password,
//                 })
//                 .expect(201)
//                 .then(({ body }: request.Response) => {
//                     return body;
//                 });
//
//             const { accessToken } = <
//                 ExternalAuthRegisterCommandContract.Response
//             >body;
//             expect(accessToken).toBeDefined();
//             newFakeUser.setAccessToken(accessToken);
//             await newFakeUser.setUuid();
//
//             createdFakeUsers.push(newFakeUser);
//         });
//         it('[/ POST] not valid email (string) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/register')
//                 .send(<ExternalAuthRegisterCommandContract.Request>{
//                     email: 'not.valid.email',
//                     password: faker.internet.password(),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message).toEqual(EMAIL.MUST_BE_A_VALID_EMAIL);
//         });
//         it('[/ POST] not valid email (number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/register')
//                 .send({
//                     email: 42,
//                     password: faker.internet.password(),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
//         });
//         it('[/ POST] to short password [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/register')
//                 .send({
//                     email: faker.internet.email(),
//                     password: makePassword(6, 'a'),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
//                 true,
//             );
//         });
//         it('[/ POST] to long password > 64 (string) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/register')
//                 .send({
//                     email: faker.internet.email(),
//                     password: makePassword(65, 'a'),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
//                 true,
//             );
//         });
//         it('[/ POST] not valid password < 8 (number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/register')
//                 .send({
//                     email: faker.internet.email(),
//                     password: makePassword(4, 4),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
//                 true,
//             );
//         });
//         it('[/ POST] to long password > 64 (number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/register')
//                 .send({
//                     email: faker.internet.email(),
//                     password: makePassword(4, 65),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
//                 true,
//             );
//         });
//         it('[/ POST] not valid email & password (number, number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/register')
//                 .send({
//                     email: 42,
//                     password: makePassword(4, 4),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
//             expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
//                 true,
//             );
//         });
//     });
//     describe('[/v1/auth/login POST] [LOGIN]', () => {
//         let fakeUserFotTestLogin: FakeUserGodLikeEntity;
//         beforeAll(async () => {
//             fakeUserFotTestLogin = await new FakeUserGodLikeEntity(
//                 apiAuth,
//                 jwtService,
//                 configService,
//                 uuidService,
//             ).register();
//         });
//         afterAll(async () => {
//             const deletedFakeUser =
//                 await fakeUserFotTestLogin.deleteCreatedUser();
//             expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestLogin.uuid);
//         });
//         it('[/ POST] correct credentials [success]', async () => {
//             const { body, headers } = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send(<ExternalAuthLoginCommandContract.Request>{
//                     email: fakeUserFotTestLogin.email,
//                     password: fakeUserFotTestLogin.password,
//                 })
//                 .expect(200)
//                 .then((res: request.Response) => res);
//
//             const { accessToken } = <ExternalAuthLoginCommandContract.Response>(
//                 body
//             );
//             expect(accessToken).toBeDefined();
//             expect(headers['set-cookie']).toBeDefined();
//
//             fakeUserFotTestLogin.setAccessToken(accessToken);
//             fakeUserFotTestLogin.setCookies(headers['set-cookie']);
//         });
//         it('[/ POST] wrong email (string) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send(<ExternalAuthLoginCommandContract.Request>{
//                     email: 'wrong@email.com',
//                     password: fakeUserFotTestLogin.password,
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(USER.NOT_FOUND)).toEqual(true);
//         });
//         it('[/ POST] wrong password (string) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send(<ExternalAuthLoginCommandContract.Request>{
//                     email: fakeUserFotTestLogin.email,
//                     password: makePassword(8, 'a'),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(USER.WRONG_PASSWORD)).toEqual(true);
//         });
//         it('[/ POST] wrong email / password (string, string) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send(<ExternalAuthLoginCommandContract.Request>{
//                     email: 'wrong@email.com',
//                     password: makePassword(8, 'a'),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(USER.NOT_FOUND)).toEqual(true);
//         });
//         it('[/ POST] not valid email (number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send({
//                     email: 42,
//                     password: fakeUserFotTestLogin.password,
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
//             expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
//                 true,
//             );
//         });
//         it('[/ POST] not valid password (number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send({
//                     email: fakeUserFotTestLogin.email,
//                     password: makePassword(8, 8),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
//                 true,
//             );
//         });
//         it('[/ POST] not valid password < 8 (number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send({
//                     email: fakeUserFotTestLogin.email,
//                     password: makePassword(4, 4),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
//                 true,
//             );
//         });
//         it('[/ POST] not valid password > 64 (number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send({
//                     email: fakeUserFotTestLogin.email,
//                     password: makePassword(65, 8),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
//                 true,
//             );
//         });
//         it('[/ POST] not valid email / password (number, number) [failed]', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .post('/v1/auth/login')
//                 .send({
//                     email: 42,
//                     password: makePassword(8, 8),
//                 })
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
//             expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
//                 true,
//             );
//             expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
//                 true,
//             );
//         });
//     });
//     describe('[/v1/auth/refresh GET] [REFRESH]', () => {
//         let fakeUserFotTestRefresh: FakeUserGodLikeEntity;
//         beforeAll(async () => {
//             fakeUserFotTestRefresh = await new FakeUserGodLikeEntity(
//                 apiAuth,
//                 jwtService,
//                 configService,
//                 uuidService,
//             ).register();
//         });
//         afterAll(async () => {
//             const deletedFakeUser =
//                 await fakeUserFotTestRefresh.deleteCreatedUser();
//             expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestRefresh.uuid);
//         });
//         it('[/ GET] [success]', async () => {
//             const { body } = await request(apiAuth.getHttpServer())
//                 .get('/v1/auth/refresh')
//                 .set(
//                     'Authorization',
//                     `Bearer ${fakeUserFotTestRefresh.accessToken}`,
//                 )
//                 .set('Cookie', `${fakeUserFotTestRefresh.cookies}`)
//                 .expect(200)
//                 .then((res: request.Response) => res);
//
//             expect(
//                 <ExternalAuthRefreshCommandContract.Response>body.accessToken,
//             ).toBeDefined();
//
//             fakeUserFotTestRefresh
//                 .validateAccessToken(body.accessToken)
//                 .then((tokenDecoded: ITokenDecoded) => {
//                     expect(tokenDecoded.uuid).toEqual(
//                         fakeUserFotTestRefresh.uuid,
//                     );
//                     fakeUserFotTestRefresh.setAccessToken(body.accessToken);
//                 });
//         });
//         it('[/ GET] expired accessToken [failed]', async () => {
//             const expiredAccessToken =
//                 await fakeUserFotTestRefresh.generateExpiredAccessToken();
//
//             const { body } = await request(apiAuth.getHttpServer())
//                 .get('/v1/auth/refresh')
//                 .set('Authorization', `Bearer ${expiredAccessToken}`)
//                 .set('Cookie', `${fakeUserFotTestRefresh.cookies}`)
//                 .expect(401)
//                 .then((res: request.Response) => res);
//
//             expect(body.message).toEqual(USER.UNAUTHORIZED);
//         });
//         it('[/ GET] expired refreshToken [failed]', async () => {
//             const expiredRefreshToken =
//                 await fakeUserFotTestRefresh.generateExpiredRefreshToken();
//
//             const { body } = await request(apiAuth.getHttpServer())
//                 .get('/v1/auth/refresh')
//                 .set(
//                     'Authorization',
//                     `Bearer ${fakeUserFotTestRefresh.accessToken}`,
//                 )
//                 .set('Cookie', `refreshToken=${expiredRefreshToken}`)
//                 .expect(401)
//                 .then((res: request.Response) => res);
//
//             expect(body.message).toEqual(JWT.EXPIRED);
//         });
//     });
//     describe('[/v1/auth/logout GET] [LOGOUT]', () => {
//         let fakeUserFotTestLogout: FakeUserGodLikeEntity;
//         beforeAll(async () => {
//             fakeUserFotTestLogout = await new FakeUserGodLikeEntity(
//                 apiAuth,
//                 jwtService,
//                 configService,
//                 uuidService,
//             ).register();
//         });
//         afterAll(async () => {
//             const deletedFakeUser =
//                 await fakeUserFotTestLogout.deleteCreatedUser();
//             expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestLogout.uuid);
//         });
//         it('[/ GET] [success] ', async () => {
//             const body = await request(apiAuth.getHttpServer())
//                 .get('/v1/auth/logout')
//                 .set(
//                     'Authorization',
//                     `Bearer ${fakeUserFotTestLogout.accessToken}`,
//                 )
//                 .set('Cookie', `${fakeUserFotTestLogout.cookies}`)
//                 .expect(401)
//                 .then(({ body }: request.Response) => body);
//
//             expect(body.message).toEqual(USER.UNAUTHORIZED);
//         });
//         it('[/ GET] expired accessToken [failed]', async () => {
//             const expiredAccessToken =
//                 await fakeUserFotTestLogout.generateExpiredAccessToken();
//
//             const { body } = await request(apiAuth.getHttpServer())
//                 .get('/v1/auth/logout')
//                 .set('Authorization', `Bearer ${expiredAccessToken}`)
//                 .set('Cookie', `${fakeUserFotTestLogout.cookies}`)
//                 .expect(401)
//                 .then((res: request.Response) => res);
//
//             expect(body.message).toEqual(USER.UNAUTHORIZED);
//         });
//         it('[/ GET] expired refreshToken [failed]', async () => {
//             const expiredRefreshToken =
//                 await fakeUserFotTestLogout.generateExpiredRefreshToken();
//
//             const { body } = await request(apiAuth.getHttpServer())
//                 .get('/v1/auth/logout')
//                 .set(
//                     'Authorization',
//                     `Bearer ${fakeUserFotTestLogout.accessToken}`,
//                 )
//                 .set('Cookie', `refreshToken=${expiredRefreshToken}`)
//                 .expect(401)
//                 .then((res: request.Response) => res);
//
//             expect(body.message).toEqual(JWT.EXPIRED);
//         });
//     });
// });
