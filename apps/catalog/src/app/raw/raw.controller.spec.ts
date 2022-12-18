import { NestApplication } from '@nestjs/core';
import { RMQModule, RMQService, RMQTestService } from 'nestjs-rmq';
import { Raw } from '@prisma/client/scripts/catalog-client';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig } from '../../config/env.config';
import { RawController } from './raw.controller';
import { RawModule } from './raw.module';
import {
    RawConnectionsCommandContract,
    RawUpdateCommandContract,
} from '@jerky/contracts';
import { RMQConfig } from '../../config/rmq.config';
import { ConnectionActions, RawConnectionModelNames } from '@jerky/enums';

describe(`[ Raw Controller ]`, () => {
    let app: NestApplication;
    let rawController: RawController;
    let rmqService: RMQTestService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(ENVConfig()),
                RMQModule.forRootAsync(RMQConfig()),
                RawModule,
            ],
        }).compile();

        app = module.createNestApplication();
        rawController = app.get<RawController>(RawController);
        rmqService = app.get(RMQService);
        // app.useGlobalPipes(new UnprocessableEntityValidationPipe());

        // app.useGlobalFilters(new AllExceptionsFilter());
        // app.useGlobalInterceptors(new TransformInterceptor());

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe(`[ RMQ ] CRUD`, () => {
        const raws: Raw[] = [];

        it('[ app ] toBeDefined', function () {
            expect(app).toBeDefined();
        });

        it('[ rawController ] toBeDefined - success', function () {
            expect(rawController).toBeDefined();
        });

        // describe('[ C ]', () => {
        //     describe(`Create - (${RawCreate.topic})`, () => {
        //         it(`correct props - expect success`, async () => {
        //             const title: string = crypto.randomUUID();
        //             const description: string = crypto.randomUUID();
        //             const recipeTypeUuid = '';
        //             const categoryUuid = '';
        //             const rawUuid = '';
        //         });
        //     });
        //
        //     describe(`Validation - (${RawCreate.topic})`, () => {
        //         it(`duplicate title - expect ConflictException`, async () => {
        //             //
        //         });
        //         it(`empty props - expect BadRequestException`, async () => {
        //             //
        //         });
        //         it(`to short title - expect RMQError`, async () => {
        //             //
        //         });
        //         it(`to long title - expect RMQError`, async () => {
        //             //
        //         });
        //         it(`not valid title - expect  RMQError`, async () => {
        //             //
        //         });
        //         it(`not valid description - expect RMQError`, async () => {
        //             //
        //         });
        //     });
        // });

        // describe('[ R ]', () => {
        //     describe(`Find One`, () => {
        //         describe(`(${RawFindOneUuid.topic}`, () => {
        //             it(`correct uuid - success`, async () => {
        //                 //
        //             });
        //         });
        //         describe(`${RawFindOneTitle.topic}`, () => {
        //             it(`correct title - success`, async () => {
        //                 //
        //             });
        //         });
        //
        //         describe(`Validation - (${RawFindOneUuid.topic})`, () => {
        //             it(`wrong uuid - expect NotFoundException`, async () => {
        //                 //
        //             });
        //             it(`not valid uuid - expect RMQError`, async () => {
        //                 //
        //             });
        //         });
        //     });
        //     describe(`Find Filtered - (${RawFindFiltered.topic})`, () => {
        //         it(`correct props - expect success`, async () => {
        //             //
        //         });
        //         describe(`Validation - (${RawFindFiltered.topic})`, () => {
        //             it(`not valid "take" (string) - expect - RMQError`, async () => {
        //                 //
        //             });
        //             it(`not valid "skip" (string) - expect - RMQError`, async () => {
        //                 //
        //             });
        //             it(`not valid "orderBy" - expect - RMQError`, async () => {
        //                 //
        //             });
        //             it(`not valid "searchString" - expect RMQError`, async () => {
        //                 //
        //             });
        //         });
        //     });
        // });

        describe('[ U ]', () => {
            describe(`Update - (${RawUpdateCommandContract.topic})`, () => {
                // it(`correct props - expect success`, async () => {
                //     const tmpRaw = await rmqService.triggerRoute<
                //         RawCreate.Request,
                //         RawCreate.Response
                //     >(RawCreate.topic, {
                //         title: `some raw - ${crypto.randomUUID()}`,
                //         price: 42,
                //         description: `some description - ${crypto.randomUUID()}`,
                //     });
                //
                //     const updated = await rmqService.triggerRoute<
                //         RawConnect.Request,
                //         RawConnect.Response
                //     >(RawConnect.topic, {
                //         connect: {
                //             from: '',
                //             to: '',
                //         },
                //     });
                //
                //     console.log(tmpRaw, updated);
                // });
                it(`connect`, async () => {
                    await rmqService
                        .send<
                            RawConnectionsCommandContract.Request,
                            RawConnectionsCommandContract.Response
                        >(RawConnectionsCommandContract.topic, {
                            uuid: 'bf0e9d61-9062-4b71-8ce2-6ef7e2811392',
                            targetUuid: '47e3f50a-4a87-4eb7-8581-d5ee34d38504',
                            model: RawConnectionModelNames.CATEGORY,
                            action: ConnectionActions.CONNECT,
                        })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((error) => {
                            if (error instanceof Error) {
                                console.log(error.message);
                            }
                        });
                });

                it(`disconnect`, async () => {
                    await rmqService
                        .send<
                            RawConnectionsCommandContract.Request,
                            RawConnectionsCommandContract.Response
                        >(RawConnectionsCommandContract.topic, {
                            uuid: 'bf0e9d61-9062-4b71-8ce2-6ef7e2811392',
                            targetUuid: '47e3f50a-4a87-4eb7-8581-d5ee34d38504',
                            model: RawConnectionModelNames.CATEGORY,
                            action: ConnectionActions.DISCONNECT,
                        })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((error) => {
                            if (error instanceof Error) {
                                console.log(error.message);
                            }
                        });
                });
            });

            // describe(`Validation - (${RawUpdate.topic})`, () => {
            //     it(`duplicate title - expect ConflictException`, async () => {
            //         //
            //     });
            //     it(`empty props - expect RMQError`, async () => {
            //         //
            //     });
            //     it(`wrong uuid - expect NotFoundException`, async () => {
            //         //
            //     });
            //     it(`not valid uuid - expect RMQError`, async () => {
            //         //
            //     });
            //     it(`not valid title - expect RMQError`, async () => {
            //         //
            //     });
            // });
        });

        // describe('[ D ]', () => {
        //     describe(`Remove - (${RawRemove.topic})`, () => {
        //         it(`expect removed Raw.uuid = passed.uuid`, async () => {
        //             //
        //         });
        //     });
        //
        //     describe(`Validation - (${RawRemove.topic})`, () => {
        //         it(`wrong uuid - expect NotFoundException`, async () => {
        //             //
        //         });
        //         it(`not valid uuid (number) - expect NotFoundException`, async () => {
        //             //
        //         });
        //     });
        //
        //     it('Remove All created records', async () => {
        //         //
        //     });
        // });
    });
});
