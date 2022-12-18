export namespace Generate {
    export const string = (
        length: number,
        filler: number | string,
    ): number | string => {
        const password = [...Array(length).fill(filler)].join('');

        return typeof filler === 'number' ? Number(password) : String(password);
    };
}
