// import { Prisma } from '@prisma/client/scripts/catalog-client';
// import { BadRequestException, ConflictException } from '@nestjs/common';
// import { OrderBy } from '../../../prisma/seed/helper';
//
// interface IOr {
//     OR: { title: { contains: string } }[] | { OR?: undefined };
// }
//
// export abstract class TesterHelper {
//     public or(
//         searchString?: string,
//     ): { OR: { title: { contains: string } }[] } | { OR?: undefined } {
//         return searchString
//             ? {
//                   OR: [{ title: { contains: searchString } }],
//               }
//             : {};
//     }
//
//     public take(take?: number): number {
//         return Number(take) || Number(10);
//     }
//
//     public skip(skip?: number): number | undefined {
//         return Number(skip) || undefined;
//     }
//
//     public orderBy(orderBy?: OrderBy): {
//         title: OrderBy | 'asc' | 'desc' | undefined;
//     } {
//         return {
//             title: orderBy || OrderBy.ASC,
//         };
//     }
//
//     public handleError(error: unknown): void {
//         if (error instanceof Error) console.log(error.message);
//
//         if (error instanceof Prisma.PrismaClientUnknownRequestError) {
//             throw new BadRequestException();
//         }
//
//         if (error instanceof Prisma.PrismaClientValidationError) {
//             throw new BadRequestException();
//         }
//         if (error instanceof Prisma.PrismaClientKnownRequestError) {
//             if (error.code === 'P2002') throw new ConflictException();
//         }
//         throw new BadRequestException();
//     }
// }
