import { MigrationInterface, QueryRunner } from "typeorm"

export class DropAllForeignKey1702464613720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key carts product_id
        await queryRunner.query(`ALTER TABLE carts DROP FOREIGN KEY carts_ibfk_1`)
        // Drop foreign key carts customer_id
        await queryRunner.query(`ALTER TABLE carts DROP FOREIGN KEY carts_ibfk_2`)
        // Drop foreign key orders product_id
        await queryRunner.query(`ALTER TABLE orders DROP FOREIGN KEY orders_ibfk_1`)
        // Drop foreign key products store_id
        await queryRunner.query(`ALTER TABLE products DROP FOREIGN KEY products_ibfk_1`)
        // Drop foreign key trash_products store_id
        await queryRunner.query(`ALTER TABLE trash_products DROP FOREIGN KEY trash_products_ibfk_1`)
        // Drop foreign key trash_user user_level
        await queryRunner.query(`ALTER TABLE trash_users DROP FOREIGN KEY trash_users_ibfk_1`)
        // Drop foreign key user_group_rules role_id
        await queryRunner.query(`ALTER TABLE user_group_rules DROP FOREIGN KEY user_group_rules_ibfk_1`)
        // Drop foreign key user_group_rules rules_id
        await queryRunner.query(`ALTER TABLE user_group_rules DROP FOREIGN KEY user_group_rules_ibfk_2`)
        // Drop foreign key users user_level
        await queryRunner.query(`ALTER TABLE users DROP FOREIGN KEY users_ibfk_1`)


        await queryRunner.query(`
            ALTER TABLE trash_users
            ADD COLUMN first_name VARCHAR(50) AFTER password,
            ADD COLUMN last_name VARCHAR(50) AFTER password;
        `)

        await queryRunner.query(`
            ALTER TABLE transactions
            ADD COLUMN payment_at DATETIME,
            ADD COLUMN shipping_at DATETIME,
            ADD COLUMN arrived_at DATETIME;
        `)

        await queryRunner.query(`ALTER TABLE products MODIFY COLUMN stock INT UNSIGNED`)
        
        await queryRunner.query(`ALTER TABLE trash_products DROP COLUMN quantity`)

        await queryRunner.query(`ALTER TABLE transactions CHANGE COLUMN order_time created_at DATETIME DEFAULT CURRENT_TIMESTAMP`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE trash_users
      DROP COLUMN first_name,
      DROP COLUMN last_name;
    `);

        await queryRunner.query(`
            ALTER TABLE transactions
            DROP COLUMN payment_at,
            DROP COLUMN shipping_at,
            DROP COLUMN arrived_at;
        `)

        await queryRunner.query(`ALTER TABLE transactions CHANGE COLUMN created_at order_time DATETIME DEFAULT CURRENT_TIMESTAMP`)

        // Add back foreign keys
        await queryRunner.query(`ALTER TABLE carts ADD FOREIGN KEY (product_id) REFERENCES products(id)`);
        await queryRunner.query(`ALTER TABLE carts ADD FOREIGN KEY (customer_id) REFERENCES users(id)`);
        await queryRunner.query(`ALTER TABLE orders ADD FOREIGN KEY (product_id) REFERENCES products(id)`);
        await queryRunner.query(`ALTER TABLE products ADD FOREIGN KEY (store_id) REFERENCES stores(id)`);
        await queryRunner.query(`ALTER TABLE trash_products ADD FOREIGN KEY (store_id) REFERENCES stores(id)`);
        await queryRunner.query(`ALTER TABLE trash_users ADD FOREIGN KEY (user_level) REFERENCES user_roles(id)`);
        await queryRunner.query(`ALTER TABLE user_group_rules ADD FOREIGN KEY (role_id) REFERENCES user_roles(id)`);
        await queryRunner.query(`ALTER TABLE user_group_rules ADD FOREIGN KEY (rules_id) REFERENCES user_rules(id)`);
        await queryRunner.query(`ALTER TABLE users ADD FOREIGN KEY (user_level) REFERENCES user_roles(id)`);
    }

}
