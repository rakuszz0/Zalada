import { MigrationInterface, QueryRunner } from "typeorm"

export class ChangeOrdersTransactionsTable1702359104353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE transactions DROP FOREIGN KEY transactions_ibfk_2`)
        await queryRunner.query(`ALTER TABLE transactions DROP FOREIGN KEY transactions_ibfk_3`)
        await queryRunner.query(`ALTER TABLE transactions DROP FOREIGN KEY transactions_ibfk_4`)

        await queryRunner.query(`ALTER TABLE transactions DROP COLUMN customer_id`)
        await queryRunner.query(`ALTER TABLE transactions DROP COLUMN payment_type`)
        await queryRunner.query(`ALTER TABLE transactions DROP COLUMN verified_by`)
        await queryRunner.query(`ALTER TABLE transactions DROP COLUMN order_time`)
        await queryRunner.query(`ALTER TABLE transactions DROP COLUMN status`)

        await queryRunner.query(`ALTER TABLE transactions RENAME TO orders`)

        await queryRunner.query(`CREATE TABLE transactions (
            order_no VARCHAR(25) PRIMARY KEY,
            status INT,
            customer_id INT,
            payment_type INT,
            verified_by INT,
            order_time DATETIME DEFAULT CURRENT_TIMESTAMP
        )`)


        await queryRunner.query(`ALTER TABLE orders ADD COLUMN order_no VARCHAR(25)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
