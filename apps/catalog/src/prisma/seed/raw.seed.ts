import {
    Category,
    PrismaClient,
    Raw,
} from '@prisma/client/scripts/catalog-client';
import * as crypto from 'crypto';

const prismaClient = new PrismaClient();

export interface IRaw {
    uuid: string;
    title: string;
    description: string;
    price: number;
}

const raws: IRaw[] = [
    {
        uuid: crypto.randomUUID(),
        title: 'Chicken',
        description: 'Best ever Chicks)',
        price: 75,
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Beef',
        description: 'Only yang Cows',
        price: 250,
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Hindi',
        description: 'FBB (Fucking Big Bird)',
        price: 75,
    },
    {
        uuid: crypto.randomUUID(),
        title: 'Fish',
        description: 'Almost alive dry fish',
        price: 80,
    },
];

const saveRaw = async (
    { uuid, price, title, description }: IRaw,
    categoryUuid: { uuid: string }[],
): Promise<Raw> => {
    try {
        return await prismaClient.raw.create({
            data: {
                uuid,
                title,
                description,
                price,
                category: {
                    connect: categoryUuid,
                },
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const main = async (categories: Category[]): Promise<Raw[]> => {
    const createdRaws: Raw[] = [];
    const categoryUuid: { uuid: string }[] = categories.map(({ uuid }) => ({
        uuid,
    }));
    for (const raw of raws) {
        createdRaws.push(await saveRaw(raw, categoryUuid));
    }
    return createdRaws;
};

export const seedRaws = async (categories: Category[]): Promise<Raw[]> => {
    return await main(categories)
        .then(async (res) => {
            await prismaClient.$disconnect();
            console.log(res);
            return res;
        })
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        });
};
