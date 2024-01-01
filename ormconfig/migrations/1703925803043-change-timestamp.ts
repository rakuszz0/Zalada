import { MigrationInterface, QueryRunner } from "typeorm"

export class ChangeTimestamp1703925803043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const transactions = await queryRunner.query(`
            SELECT
            order_no,
            UNIX_TIMESTAMP(created_at) created_at,
            UNIX_TIMESTAMP(payment_at) payment_at,
            UNIX_TIMESTAMP(shipping_at) shipping_at,
            UNIX_TIMESTAMP(arrived_at) arrived_at 
            FROM transactions
        `)

        // Change datetime column to number
        await queryRunner.query(`
            ALTER TABLE transactions
                MODIFY COLUMN created_at INT,
                MODIFY COLUMN payment_at INT,
                MODIFY COLUMN shipping_at INT,
                MODIFY COLUMN arrived_at INT
        `)


        for (const transaction of transactions) {
            await queryRunner.query(`
                UPDATE transactions SET created_at = ?, payment_at = ?, shipping_at = ?, arrived_at = ? WHERE order_no = ?
            `, [transaction.created_at, transaction.payment_at, transaction.shipping_at, transaction.arrived_at, transaction.order_no])
        }


        // Change users table
        const users = await queryRunner.query(`SELECT UNIX_TIMESTAMP(registered_date) registered_date, id FROM users`)
        await queryRunner.query(`ALTER TABLE users MODIFY COLUMN registered_date INT NOT NULL`)
        for (const user of users) {
            await queryRunner.query(`
                UPDATE users SET registered_date = ? WHERE id = ?
            `, [user.registered_date, user.id])
        }
        

        // Change trash_user table
        const trashuser = await queryRunner.query(`SELECT UNIX_TIMESTAMP(registered_date) registered_date, id FROM trash_users`)
        await queryRunner.query(`ALTER TABLE trash_users MODIFY COLUMN registered_date INT NOT NULL`)
        for (const trash of trashuser) {
            await queryRunner.query(`
                UPDATE trash_users SET registered_date = ? WHERE id = ?
            `, [trash.registered_date, trash.id])
        }



        // Change reviews table
        const reviews = await queryRunner.query(`SELECT id, UNIX_TIMESTAMP(created_at) created_at FROM reviews`)
        await queryRunner.query(`ALTER TABLE reviews MODIFY COLUMN created_at INT NOT NULL`)
        for (const review of reviews) {
            await queryRunner.query(`
                UPDATE reviews SET created_at = ? WHERE id = ?
            `, [review.created_at, review.id])
        }
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        const transactions = await queryRunner.query(`
            SELECT
            order_no,
            FROM_UNIXTIME(created_at) created_at,
            FROM_UNIXTIME(payment_at) payment_at,
            FROM_UNIXTIME(shipping_at) shipping_at,
            FROM_UNIXTIME(arrived_at) arrived_at 
            FROM transactions
        `)
        
        await queryRunner.query(`
            ALTER TABLE transactions
                MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                MODIFY COLUMN payment_at DATETIME,
                MODIFY COLUMN shipping_at DATETIME,
                MODIFY COLUMN arrived_at DATETIME
        `);

        for (const transaction of transactions) {
            await queryRunner.query(`
                UPDATE transactions SET created_at = ?, payment_at = ?, shipping_at = ?, arrived_at = ? WHERE order_no = ?
            `, [transaction.created_at, transaction.payment_at, transaction.shipping_at, transaction.arrived_at, transaction.order_no])
        }

        // Change users table
        const users = await queryRunner.query(`SELECT FROM_UNIXTIME(registered_date) registered_date, id FROM users`)
        await queryRunner.query(`ALTER TABLE users MODIFY COLUMN registered_date DATETIME DEFAULT CURRENT_TIMESTAMP`)
        for (const user of users) {
            await queryRunner.query(`
                UPDATE users SET registered_date = ? WHERE id = ?
            `, [user.registered_date, user.id])
        }


        // Change trash_user table
        const trashuser = await queryRunner.query(`SELECT FROM_UNIXTIME(registered_date) registered_date, id FROM trash_users`)
        await queryRunner.query(`ALTER TABLE trash_users MODIFY COLUMN registered_date DATETIME DEFAULT CURRENT_TIMESTAMP`)
        for (const trash of trashuser) {
            await queryRunner.query(`
                UPDATE trash_users SET registered_date = ? WHERE id = ?
            `, [trash.registered_date, trash.id])
        }



        // Change reviews table
        const reviews = await queryRunner.query(`SELECT id, FROM_UNIXTIME(created_at) created_at FROM reviews`)
        await queryRunner.query(`ALTER TABLE reviews MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`)
        for (const review of reviews) {
            await queryRunner.query(`
                UPDATE reviews SET created_at = ? WHERE id = ?
            `, [review.created_at, review.id])
        }
    }

}
