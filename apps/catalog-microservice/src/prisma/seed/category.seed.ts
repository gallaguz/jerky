import {
    Category,
    Prisma,
    PrismaClient,
} from '@prisma/client/scripts/catalog-client';
import CategoryCreateInput = Prisma.CategoryCreateInput;
import * as slug from 'slug';

const prismaClient = new PrismaClient();

type TCategoryInput = {
    title: string;
    description: string;
};

const categories: TCategoryInput[] = [
    {
        title: 'Jerky',
        description: 'Perfect dry meat',
    },
    {
        title: 'Sausages',
        description: 'Premium sausages',
    },
];

const main = async (categories: TCategoryInput[]): Promise<Category[]> => {
    const createdCategories: Category[] = [];

    for (const category of categories) {
        const data: CategoryCreateInput = {
            alias: slug(category.title),
            title: category.title,
            description: category.description,
        };
        createdCategories.push(await prismaClient.category.create({ data }));
    }
    return createdCategories;
};

export const seedCategories = async (): Promise<Category[]> => {
    const start = performance.now();

    return await main(categories)
        .catch(async (e) => {
            console.error(e);
            await prismaClient.$disconnect();
            process.exit(1);
        })
        .finally(async () => {
            await prismaClient.$disconnect().then(() => {
                const end = Math.floor(performance.now() - start);
                console.log(`--- Category Seeded in ${end} ms ---`);
            });
        });
};
