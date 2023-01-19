import {
    Prisma,
    PrismaClient,
    Raw,
} from '@prisma/client/scripts/catalog-client';
import RawCreateInput = Prisma.RawCreateInput;
import * as slug from 'slug';

const prismaClient = new PrismaClient();

type TRawInput = {
    title: string;
    description: string;
    price: number;
    payload: number;
};
const raws: TRawInput[] = [
    {
        title: 'Chicken',
        description: 'Best ever Chicks)',
        price: 83,
        payload: 0.35,
    },
    {
        title: 'Beef',
        description: 'Only yang Cows',
        price: 250,
        payload: 0.35,
    },
    {
        title: 'Hindi',
        description: 'FBB (Fucking Big Bird)',
        price: 90,
        payload: 0.35,
    },
    {
        title: 'Salmon',
        description: 'Almost alive dry fish',
        price: 80,
        payload: 0.35,
    },
];

const main = async (raws: TRawInput[]): Promise<Raw[]> => {
    const createdRaws: Raw[] = [];

    for (const raw of raws) {
        const data: RawCreateInput = {
            alias: slug(raw.title),
            title: raw.title,
            description: raw.description,
            price: raw.price,
            payload: raw.payload,
        };
        createdRaws.push(await prismaClient.raw.create({ data }));
    }
    return createdRaws;
};

export const seedRaws = async (): Promise<Raw[]> => {
    const start = performance.now();

    return await main(raws)
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        })
        .finally(async () => {
            await prismaClient.$disconnect().then(() => {
                const end = Math.floor(performance.now() - start);
                console.log(`--- Raw Seeded in ${end} ms ---`);
            });
        });
};
