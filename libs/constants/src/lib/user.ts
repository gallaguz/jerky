export enum USER {
    NOT_FOUND = 'User not found',
}

// Validation
export enum TAKE {
    MUST_NOT_BE_NO_LESS_THEN_1 = '"take" - must not be less than 1',
    MUST_BE_A_NUMBER = '"take" - must be a number',
}
export enum SKIP {
    MUST_NOT_BE_LESS_THEN_ZERO = '"skip" - must not be less than 0',
    MUST_BE_A_NUMBER = '"skip" - must be a number',
}
export enum ORDER_BY {
    MUST_BE_ASC_OD_DESC = '"orderBy" - must be asc/desc',
}
export enum SEARCH_STRING {
    MUST_BE_A_STRING = '"searchString" - must be a string',
}
