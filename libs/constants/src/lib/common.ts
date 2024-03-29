export namespace ERROR_MESSAGES {
    export const INCLUDE_SELECT = `Please either use "include" or "select", but not both at the same time.`;
    export const SOMETHING_WENT_WRONG = 'Something went wrong';

    export enum JWT {
        EXPIRED = 'jwt expired',
    }

    export enum USER {
        NOT_FOUND = 'User not found',
        WRONG_PASSWORD = 'Wrong password',
        USER_EXIST = 'User exist',
        UNAUTHORIZED = 'Unauthorized',
    }

    // Validation
    export enum TAKE {
        MUST_NOT_BE_NO_LESS_THEN_1 = 'take - must not be less than 1',
        MUST_BE_A_NUMBER = 'take - must be a number',
    }
    export enum SKIP {
        MUST_NOT_BE_LESS_THEN_ZERO = 'skip - must not be less than 0',
        MUST_BE_A_NUMBER = 'skip - must be a number',
    }
    export enum ORDER_BY {
        MUST_BE_ASC_OD_DESC = 'orderBy - must be asc/desc',
    }
    export enum SEARCH_STRING {
        MUST_BE_A_STRING = 'searchString - must be a string',
    }

    export enum EMAIL {
        MUST_BE_A_VALID_EMAIL = 'email - must be a valid email',
        MUST_BE_A_STRING = 'email - must be a string',
    }

    export enum UUID {
        MUST_BE_A_VALID_UUID = 'uuid - must be a valid uuid',
        MUST_BE_A_STRING = 'uuid - must be a string',
    }

    export enum PASSWORD {
        MUST_BE_A_STRING = 'password - must be a string',
        MUST_BE_LONGER = 'password - must be longer then 8 chars',
        MUST_BE_SHORTER = 'password - must be shorter then 64 chars',
    }

    export enum ALIAS {
        MUST_BE_LONGER = 'alias - must be longer than or equal to 4 characters',
        MUST_BE_SHORTER = 'alias - must be shorter than or equal to 32 characters',
        MUST_BE_A_STRING = 'alias - must be a string',
    }
    export enum TITLE {
        MUST_BE_LONGER = 'title - must be longer than or equal to 4 characters',
        MUST_BE_SHORTER = 'title - must be shorter than or equal to 128 characters',
        MUST_BE_A_STRING = 'title - must be a string',
    }

    export enum DESCRIPTION {
        MUST_BE_A_STRING = 'description - must be a string',
    }

    export enum PRICE {
        MUST_BE_A_POSITIVE = 'price - must be a positive number number',
        MUST_BE_A_NUMBER = 'price - must be a number',
    }
}
