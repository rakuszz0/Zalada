import { MigrationInterface, QueryRunner } from "typeorm"

export class AddQuantityTransactions1701836755562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // add quantity on transaction
        await queryRunner.query("ALTER TABLE transactions ADD COLUMN quantity INT")

        // change column quantity to stock on products
        await queryRunner.query("ALTER TABLE products CHANGE COLUMN quantity stock INT DEFAULT 1")    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
