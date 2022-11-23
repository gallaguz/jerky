import { ITokenDecoded, ITokenPayload } from '@jerky/interfaces';
import { delay } from 'rxjs';
import {
    HttpRegister,
    HttpLogin,
    HttpRefresh,
    UserRemoveEvent,
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
import { Role } from '@prisma/client/scripts/user-client';
import { UUUIDService } from '../../common/uuid.service';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from '../../../configs/winston.config';
import { ERROR_MESSAGES } from '@jerky/constants';
import PASSWORD = ERROR_MESSAGES.PASSWORD;
import JWT = ERROR_MESSAGES.JWT;
import EMAIL = ERROR_MESSAGES.EMAIL;
import USER = ERROR_MESSAGES.USER;

class FakeUserGodLikeEntity {
    private _api: INestApplication;
    private _jwtService: JwtService;
    private _configService: ConfigService;
    private _uuidService: UUUIDService;
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
        uuidService: UUUIDService,
    ) {
        this._api = api;
        this._jwtService = jwtService;
        this._configService = configService;
        this._uuidService = uuidService;

        this._secrets.accessTokenSecret =
            this._configService.get('JWT_SECRET_ACCESS') ?? '';
        this._secrets.refreshTokenSecret =
            this._configService.get('JWT_SECRET_REFRESH') ?? '';

        this.setEmail();
        this.setPassword();

        return this;
    }

    public async register(): Promise<this> {
        const { body, headers } = await request(this._api.getHttpServer())
            .post('/v1/auth/register')
            .send(<HttpRegister.Request>{
                email: this._credentials.email,
                password: this._credentials.password,
            })
            .expect(201)
            .then((res: request.Response) => res);

        const { accessToken } = <HttpRegister.Response>body;

        this._tokens.accessToken = accessToken;
        this._cookies = headers['set-cookie'];
        this._uuid = await this.validateAccessToken().then((res) => res.uuid);

        return this;
    }

    public async deleteCreatedUser(
        uuid?: string,
    ): Promise<UserRemoveEvent.Response> {
        const userUuidToDelete = uuid ?? this._uuid;
        return await request(this._api.getHttpServer())
            .delete(`/v1/user/${userUuidToDelete}`)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(<UserRemoveEvent.Response>body.uuid).toEqual(
                    userUuidToDelete,
                );
                return body;
            });
    }

    public async generateAccessToken(
        uuid: string,
        role: Role,
    ): Promise<string> {
        return await this._jwtService.signAsync(<ITokenPayload>{ uuid, role }, {
            secret: this._configService.get('JWT_SECRET_ACCESS'),
            expiresIn: Number(this._configService.get('JWT_ACCESS_EXP')),
            jwtid: this._uuidService.getUuid(),
        });
    }

    public async generateExpiredAccessToken(): Promise<string> {
        return await this._jwtService.signAsync(
            <ITokenPayload>{ uuid: this._uuid, role: Role.USER },
            {
                secret: this._configService.get('JWT_SECRET_ACCESS'),
                expiresIn: -1,
                jwtid: this._uuidService.getUuid(),
            },
        );
    }

    public async generateRefreshToken(
        uuid: string,
        role: Role,
    ): Promise<string> {
        return await this._jwtService.signAsync(<ITokenPayload>{ uuid, role }, {
            secret: this._configService.get('JWT_SECRET_REFRESH'),
            expiresIn: Number(this._configService.get('JWT_REFRESH_EXP')),
            jwtid: this._uuidService.getUuid(),
        });
    }

    public async generateExpiredRefreshToken(): Promise<string> {
        return await this._jwtService.signAsync(
            <ITokenPayload>{ uuid: this._uuid, role: Role.USER },
            {
                secret: this._configService.get('JWT_SECRET_REFRESH'),
                expiresIn: -1,
                jwtid: this._uuidService.getUuid(),
            },
        );
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
            uuid ?? (await this.validateAccessToken().then((res) => res.uuid));
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
    let uuidService: UUUIDService;

    beforeAll(async () => {
        const apiModule: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forRootAsync(RMQConfig()),
                JwtModule.registerAsync(JWTConfig()),
                ApiAuthModule,
                WinstonModule.forRootAsync(WinstonConfig('API')),
            ],
        }).compile();

        apiAuth = apiModule.createNestApplication();
        apiAuth.use(cookieParser());

        configService = apiAuth.get<ConfigService>(ConfigService);
        jwtService = apiAuth.get<JwtService>(JwtService);
        uuidService = apiAuth.get<UUUIDService>(UUUIDService);

        await apiAuth.init();
    });
    afterAll(async () => {
        await delay(500);
        await apiAuth.close();
    });
    describe('[/v1/auth/register POST] [REGISTER]', () => {
        const createdFakeUsers: FakeUserGodLikeEntity[] = [];
        beforeAll(async () => {
            //
        });
        afterAll(async () => {
            for (const fakeUser of createdFakeUsers) {
                await fakeUser.deleteCreatedUser();
            }

            createdFakeUsers.length = 0;
        });
        it('[/ POST] register user [success]', async () => {
            const newFakeUser = new FakeUserGodLikeEntity(
                apiAuth,
                jwtService,
                configService,
                uuidService,
            );

            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send(<HttpRegister.Request>{
                    email: newFakeUser.email,
                    password: newFakeUser.password,
                })
                .expect(201)
                .then(({ body }: request.Response) => {
                    return body;
                });

            const { accessToken } = <HttpRegister.Response>body;
            expect(accessToken).toBeDefined();
            newFakeUser.setAccessToken(accessToken);
            await newFakeUser.setUuid();

            createdFakeUsers.push(newFakeUser);
        });
        it('[/ POST] not valid email (string) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send(<HttpRegister.Request>{
                    email: 'not.valid.email',
                    password: faker.internet.password(),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message).toEqual(EMAIL.MUST_BE_A_VALID_EMAIL);
        });
        it('[/ POST] not valid email (number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: 42,
                    password: faker.internet.password(),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
                true,
            );
            expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
        });
        it('[/ POST] to short password [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: makePassword(6, 'a'),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                true,
            );
        });
        it('[/ POST] to long password > 64 (string) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: makePassword(65, 'a'),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                true,
            );
        });
        it('[/ POST] not valid password < 8 (number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: makePassword(4, 4),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                true,
            );
        });
        it('[/ POST] to long password > 64 (number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: makePassword(4, 65),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                true,
            );
        });
        it('[/ POST] not valid email & password (number, number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/register')
                .send({
                    email: 42,
                    password: makePassword(4, 4),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
            expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                true,
            );
        });
    });
    describe('[/v1/auth/login POST] [LOGIN]', () => {
        let fakeUserFotTestLogin: FakeUserGodLikeEntity;
        beforeAll(async () => {
            fakeUserFotTestLogin = await new FakeUserGodLikeEntity(
                apiAuth,
                jwtService,
                configService,
                uuidService,
            ).register();
        });
        afterAll(async () => {
            const deletedFakeUser =
                await fakeUserFotTestLogin.deleteCreatedUser();
            expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestLogin.uuid);
        });
        it('[/ POST] correct credentials [success]', async () => {
            const { body, headers } = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send(<HttpLogin.Request>{
                    email: fakeUserFotTestLogin.email,
                    password: fakeUserFotTestLogin.password,
                })
                .expect(200)
                .then((res: request.Response) => res);

            const { accessToken } = <HttpLogin.Response>body;
            expect(accessToken).toBeDefined();
            expect(headers['set-cookie']).toBeDefined();

            fakeUserFotTestLogin.setAccessToken(accessToken);
            fakeUserFotTestLogin.setCookies(headers['set-cookie']);
        });
        it('[/ POST] wrong email (string) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send(<HttpLogin.Request>{
                    email: 'wrong@email.com',
                    password: fakeUserFotTestLogin.password,
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(USER.NOT_FOUND)).toEqual(true);
        });
        it('[/ POST] wrong password (string) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send(<HttpLogin.Request>{
                    email: fakeUserFotTestLogin.email,
                    password: makePassword(8, 'a'),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(USER.WRONG_PASSWORD)).toEqual(true);
        });
        it('[/ POST] wrong email / password (string, string) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send(<HttpLogin.Request>{
                    email: 'wrong@email.com',
                    password: makePassword(8, 'a'),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(USER.NOT_FOUND)).toEqual(true);
        });
        it('[/ POST] not valid email (number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: 42,
                    password: fakeUserFotTestLogin.password,
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
            expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
                true,
            );
        });
        it('[/ POST] not valid password (number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: fakeUserFotTestLogin.email,
                    password: makePassword(8, 8),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                true,
            );
        });
        it('[/ POST] not valid password < 8 (number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: fakeUserFotTestLogin.email,
                    password: makePassword(4, 4),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                true,
            );
        });
        it('[/ POST] not valid password > 64 (number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: fakeUserFotTestLogin.email,
                    password: makePassword(65, 8),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                true,
            );
        });
        it('[/ POST] not valid email / password (number, number) [failed]', async () => {
            const body = await request(apiAuth.getHttpServer())
                .post('/v1/auth/login')
                .send({
                    email: 42,
                    password: makePassword(8, 8),
                })
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message.includes(EMAIL.MUST_BE_A_STRING)).toEqual(true);
            expect(body.message.includes(EMAIL.MUST_BE_A_VALID_EMAIL)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_A_STRING)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_LONGER)).toEqual(
                true,
            );
            expect(body.message.includes(PASSWORD.MUST_BE_SHORTER)).toEqual(
                true,
            );
        });
    });
    describe('[/v1/auth/refresh GET] [REFRESH]', () => {
        let fakeUserFotTestRefresh: FakeUserGodLikeEntity;
        beforeAll(async () => {
            fakeUserFotTestRefresh = await new FakeUserGodLikeEntity(
                apiAuth,
                jwtService,
                configService,
                uuidService,
            ).register();
        });
        afterAll(async () => {
            const deletedFakeUser =
                await fakeUserFotTestRefresh.deleteCreatedUser();
            expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestRefresh.uuid);
        });
        it('[/ GET] [success]', async () => {
            const { body } = await request(apiAuth.getHttpServer())
                .get('/v1/auth/refresh')
                .set(
                    'Authorization',
                    `Bearer ${fakeUserFotTestRefresh.accessToken}`,
                )
                .set('Cookie', `${fakeUserFotTestRefresh.cookies}`)
                .expect(200)
                .then((res: request.Response) => res);

            expect(<HttpRefresh.Response>body.accessToken).toBeDefined();

            fakeUserFotTestRefresh
                .validateAccessToken(body.accessToken)
                .then((tokenDecoded: ITokenDecoded) => {
                    expect(tokenDecoded.uuid).toEqual(
                        fakeUserFotTestRefresh.uuid,
                    );
                    fakeUserFotTestRefresh.setAccessToken(body.accessToken);
                });
        });
        it('[/ GET] expired accessToken [failed]', async () => {
            const expiredAccessToken =
                await fakeUserFotTestRefresh.generateExpiredAccessToken();

            const { body } = await request(apiAuth.getHttpServer())
                .get('/v1/auth/refresh')
                .set('Authorization', `Bearer ${expiredAccessToken}`)
                .set('Cookie', `${fakeUserFotTestRefresh.cookies}`)
                .expect(401)
                .then((res: request.Response) => res);

            expect(body.message).toEqual(USER.UNAUTHORIZED);
        });
        it('[/ GET] expired refreshToken [failed]', async () => {
            const expiredRefreshToken =
                await fakeUserFotTestRefresh.generateExpiredRefreshToken();

            const { body } = await request(apiAuth.getHttpServer())
                .get('/v1/auth/refresh')
                .set(
                    'Authorization',
                    `Bearer ${fakeUserFotTestRefresh.accessToken}`,
                )
                .set('Cookie', `refreshToken=${expiredRefreshToken}`)
                .expect(401)
                .then((res: request.Response) => res);

            expect(body.message).toEqual(JWT.EXPIRED);
        });
    });
    describe('[/v1/auth/logout GET] [LOGOUT]', () => {
        let fakeUserFotTestLogout: FakeUserGodLikeEntity;
        beforeAll(async () => {
            fakeUserFotTestLogout = await new FakeUserGodLikeEntity(
                apiAuth,
                jwtService,
                configService,
                uuidService,
            ).register();
        });
        afterAll(async () => {
            const deletedFakeUser =
                await fakeUserFotTestLogout.deleteCreatedUser();
            expect(deletedFakeUser.uuid).toEqual(fakeUserFotTestLogout.uuid);
        });
        it('[/ GET] [success] ', async () => {
            const body = await request(apiAuth.getHttpServer())
                .get('/v1/auth/logout')
                .set(
                    'Authorization',
                    `Bearer ${fakeUserFotTestLogout.accessToken}`,
                )
                .set('Cookie', `${fakeUserFotTestLogout.cookies}`)
                .expect(401)
                .then(({ body }: request.Response) => body);

            expect(body.message).toEqual(USER.UNAUTHORIZED);
        });
        it('[/ GET] expired accessToken [failed]', async () => {
            const expiredAccessToken =
                await fakeUserFotTestLogout.generateExpiredAccessToken();

            const { body } = await request(apiAuth.getHttpServer())
                .get('/v1/auth/logout')
                .set('Authorization', `Bearer ${expiredAccessToken}`)
                .set('Cookie', `${fakeUserFotTestLogout.cookies}`)
                .expect(401)
                .then((res: request.Response) => res);

            expect(body.message).toEqual(USER.UNAUTHORIZED);
        });
        it('[/ GET] expired refreshToken [failed]', async () => {
            const expiredRefreshToken =
                await fakeUserFotTestLogout.generateExpiredRefreshToken();

            const { body } = await request(apiAuth.getHttpServer())
                .get('/v1/auth/logout')
                .set(
                    'Authorization',
                    `Bearer ${fakeUserFotTestLogout.accessToken}`,
                )
                .set('Cookie', `refreshToken=${expiredRefreshToken}`)
                .expect(401)
                .then((res: request.Response) => res);

            expect(body.message).toEqual(JWT.EXPIRED);
        });
    });
});
