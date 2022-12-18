export namespace Random {
    export const pickNumberInRange = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1)) + min;
    export const pickNumber = (): number => Math.floor(Math.random() * 100);
    export const pickObj = <T>(items: T[], count = 1): T[] => {
        const arr = [];

        for (let i = 0; i < count; i++) {
            arr.push(items[pickNumberInRange(0, items.length - 1)]);
        }

        return arr;
    };
    export const pickKey = <T, K extends keyof T>(obj: T): T[K] => {
        if (!obj) throw new Error('Input must be an Object');
        const keys = Object.keys(obj);
        const key = <K>keys[Math.floor(Math.random() * keys.length)];

        return obj[key];
    };
}
