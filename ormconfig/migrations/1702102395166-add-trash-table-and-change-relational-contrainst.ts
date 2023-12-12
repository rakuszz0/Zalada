import { MigrationInterface, QueryRunner } from "typeorm"

export class AddTrashTableAndChangeRelationalContrainst1702102395166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create trash_users table 
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS trash_users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20),
            registered_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            address VARCHAR(255),
            user_level INT NOT NULL,
            FOREIGN KEY (user_level) REFERENCES user_roles(id) ON UPDATE CASCADE ON DELETE CASCADE
            );`
        )

        //Create products
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS trash_products (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(75) NOT NULL,
            quantity INT NOT NULL,
            description TEXT,
            price INT NOT NULL,
            store_id INT NOT NULL,
            FOREIGN KEY (store_id) REFERENCES stores(id) ON UPDATE CASCADE ON DELETE CASCADE
            );`
        )

        await queryRunner.query(`ALTER TABLE transactions ADD COLUMN price INT`)
        
        await queryRunner.query(`ALTER TABLE users ADD COLUMN first_name VARCHAR(50)`)
        await queryRunner.query("ALTER TABLE users ADD COLUMN last_name VARCHAR(50)")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
