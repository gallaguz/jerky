import { Injectable, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RMQError } from 'nestjs-rmq';
import { ERROR_TYPE } from 'nestjs-rmq/dist/constants';

type TValidateOptions = {
    ignoreEmpty: boolean;
};
@Injectable()
export class ContractsValidationService {
    public async validateContract(
        contract: any,
        props: any,
        options?: TValidateOptions,
    ): Promise<any> {
        const transformed = plainToInstance(contract, props);

        if (props.include && props.select) {
            this.throwRMQError(`Don use include and select at the same time`);
        }

        if (this.isEmpty(transformed) && !options?.ignoreEmpty) {
            this.throwRMQError(`Empty contract`);
        }

        const validated: ValidationError[] = await validate(transformed, {
            forbidUnknownValues: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        const recursiveCollectConstraints = (
            validated: ValidationError[],
        ): string[] => {
            const res: string[] = [];

            validated.forEach((el) => {
                if (el.children) {
                    res.push(...recursiveCollectConstraints(el.children));
                }
                if (el.constraints) {
                    res.push(...Object.values(el.constraints));
                }
            });
            return res;
        };
        if (validated.length > 0) {
            const message = recursiveCollectConstraints(validated).join(', ');
            this.throwRMQError(message, validated);
        }

        return transformed;
    }
    private throwRMQError(
        message: string,
        validated?: ValidationError[],
    ): void {
        const validationPipe = new ValidationPipe();
        const exceptionFactory = validationPipe.createExceptionFactory();
        throw new RMQError(
            message,
            ERROR_TYPE.RMQ,
            400,
            exceptionFactory(validated) ?? undefined,
        );
    }
    private isEmpty(obj: Record<string, any>): boolean {
        return Object.keys(obj).length === 0;
    }
}
