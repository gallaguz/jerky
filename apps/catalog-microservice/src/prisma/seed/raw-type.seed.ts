import {
    Prisma,
    PrismaClient,
    RawType,
} from '@prisma/client/scripts/catalog-client';
import * as process from 'process';
import * as slug from 'slug';
import RawTypeCreateInput = Prisma.RawTypeCreateInput;

const prismaClient = new PrismaClient();

type TRawTypeInput = {
    title: string;
    description: string;
};

const rawTypes: TRawTypeInput[] = [
    {
        title: 'Bird',
        description: 'Bird can fly',
    },
    {
        title: 'Meet',
        description: 'Some Cows',
    },
    {
        title: 'Fish',
        description: 'Fish cant fly',
    },
];

const main = async (rawTypes: TRawTypeInput[]): Promise<RawType[]> => {
    const createdRawTypes: RawType[] = [];

    for (const rawType of rawTypes) {
        const data: RawTypeCreateInput = {
            alias: slug(rawType.title),
            title: rawType.title,
            description: rawType.description,
        };
        createdRawTypes.push(await prismaClient.rawType.create({ data }));
    }
    return createdRawTypes;
};

export const seedRawTypes = async (): Promise<RawType[]> => {
    const start = performance.now();

    return await main(rawTypes)
        .then(async (res) => {
            await prismaClient.$disconnect();
            // console.log(res);
            return res;
        })
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        })
        .finally(async () => {
            await prismaClient.$disconnect().then(() => {
                const end = Math.floor(performance.now() - start);
                console.log(`--- RawType Seeded in ${end} ms ---`);
            });
        });
};
