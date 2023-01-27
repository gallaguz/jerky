import * as process from 'process';

import { seedUsers } from './users-seed';

const start = performance.now();

const seed = async (): Promise<void> => {
    await seedUsers();
};

void seed()
    .then(() => {
        const end = Math.floor(performance.now() - start);
        console.log(`\nSeeding complete in ${end} ms\n`);
    })
    .catch((e) => {
        if (e instanceof Error) {
            console.log(e.message);
            console.log(`\nSeeding finished with error\n`);
            process.exit(1);
        }
    })
    .finally(() => {
        process.exit(0);
    });

/**
 * in result must seed 12 users.
 * 10 random.
 * and 2 with these credentials:
 * {
 *     email: test@test.com
 *     password: test
 *     role: USER
 * }
 * {
 *     email: admin@admin.com
 *     password: admin
 *     role: ADMIN
 * }
 */
