import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ENVConfig, RMQConfig } from '../../../configs';
import { RMQModule } from 'nestjs-rmq';
import { AppModule } from '../../app.module';
import { AnyExceptionFilter } from '../exeptions/any-exception.filter';
import { UserCommandsController } from './user.commands.controller';
import { NestApplication } from '@nestjs/core';

describe('', () => {
    let apiMicroservice: NestApplication;
    let userCommandsController: UserCommandsController;

    beforeAll(async () => {
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
    });

    afterAll(async () => {
        await apiMicroservice.close();
    });

    describe('[CREATE]', () => {
        it('', () => {
            //
        });
        it('', () => {
            //
        });
        it('', () => {
            //
        });
    });
    describe('[UPDATE]', () => {
        describe('[PASSWORD]', () => {
            it('', () => {
                //
            });
            it('', () => {
                //
            });
            it('', () => {
                //
            });
        });
        describe('[EMAIL]', () => {
            it('', () => {
                //
            });
            it('', () => {
                //
            });
            it('', () => {
                //
            });
        });
        describe('[ROLE]', () => {
            it('', () => {
                //
            });
            it('', () => {
                //
            });
            it('', () => {
                //
            });
        });
    });

    describe('[DELETE]', () => {
        it('', () => {
            //
        });
        it('', () => {
            //
        });
        it('', () => {
            //
        });
    });
});
