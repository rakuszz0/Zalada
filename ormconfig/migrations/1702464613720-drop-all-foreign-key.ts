import { MigrationInterface, QueryRunner } from "typeorm"

export class DropAllForeignKey1702464613720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key carts product_id
        await queryRunner.query(`ALTER TABLE carts DROP FOREIGN KEY carts_ibfk_1`)
        // Drop foreign key carts user_id
        await queryRunner.query(`ALTER TABLE carts DROP FOREIGN KEY carts_ibfk_2`)
        // Drop foreign key orders product_id
        await queryRunner.query(`ALTER TABLE orders DROP FOREIGN KEY orders_ibfk_1`)
        // Drop foreign key products store_id
        await queryRunner.query(`ALTER TABLE products DROP FOREIGN KEY products_ibfk_1`)
        // Drop foreign key trash_products store_id
        await queryRunner.query(`ALTER TABLE trash_products DROP FOREIGN KEY trash_products_ibfk_1`)
        // Drop foreign key trash_user user_level
        await queryRunner.query(`ALTER TABLE trash_users DROP FOREIGN KEY trash_users_ibfk_1`)
        // Drop foreign key user_group_rules rule_id
        await queryRunner.query(`ALTER TABLE user_group_rules DROP FOREIGN KEY user_group_rules_ibfk_1`)
        // Drop foreign key user_group_rules rules_id
        await queryRunner.query(`ALTER TABLE user_group_rules DROP FOREIGN KEY user_group_rules_ibfk_2`)
        // Drop foreign key user_group_rules user_level
        await queryRunner.query(`ALTER TABLE users DROP FOREIGN KEY users_ibfk_1`)


        await queryRunner.query(`
            ALTER TABLE trash_users
            ADD COLUMN first_name VARCHAR(50) AFTER password,
            ADD COLUMN last_name VARCHAR(50) AFTER password;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
