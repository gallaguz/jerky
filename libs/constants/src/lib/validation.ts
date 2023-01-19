export enum ALIAS {
    MIN_LENGTH = 4,
    MAX_LENGTH = 128,
}

export enum TITLE {
    MIN_LENGTH = 4,
    MAX_LENGTH = 128,
}
export enum DESCRIPTION {
    MIN_LENGTH = 4,
    MAX_LENGTH = 10240,
}

export enum TAKE {
    MIN = 1,
    MAX = 10,
}

export enum SKIP {
    MIN = 0,
    // MAX = 100,
}

export enum PRICE {
    MIN = 0,
    MAX = 1e9,
}
export enum PAYLOAD {
    MIN = 0,
    MAX = 100,
}
export enum PASSWORD {
    MIN = 8,
    MAX = 64,
}
