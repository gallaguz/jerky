// import { Category, PrismaClient } from '@prisma/client/scripts/catalog-client';
// import * as crypto from 'crypto';
// import { ICategory } from '@jerky/interfaces';
// import { CategoryTester } from '../../app/database/tests/category.tester';
//
// const prismaClient = new PrismaClient();
// const categoryTester = new CategoryTester(prismaClient);
//
// const categories: ICategory[] = [
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Jerky',
//         description: 'Perfect dry meat',
//     },
//     {
//         uuid: crypto.randomUUID(),
//         title: 'Sausages',
//         description: 'Premium sausages',
//     },
// ];
//
// const main = async (): Promise<Category[]> => {
//     const createdCategories: Category[] = [];
//     for (const category of categories) {
//         createdCategories.push(await categoryTester.saveModel(category));
//     }
//     return createdCategories;
// };
//
// export const seedCategories = async (): Promise<Category[]> => {
//     return await main()
//         .then(async (res) => {
//             await prismaClient.$disconnect();
//             // console.log(res);
//             return res;
//         })
//         .catch(async (e) => {
//             console.error(e);
//             await prismaClient.$disconnect();
//             process.exit(1);
//         })
//         .finally(() => {
//             console.log('--- Category Seeded ---');
//         });
// };
