import { MigrationInterface, QueryRunner } from "typeorm"

export class Init1701748611310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //create carts table
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS carts (
                id PRIMARY KEY AUTO_INCREMENT,
                product_id INT NOT NULL,
                quantity INT,
                customer_id INT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (customer_id) REFERENCES customers(id)
            )`
        )

        // Create banks table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS banks (
            id PRIMARY KEY AUTO_INCREMENT,
            bank_name VARCHAR(255) UNIQUE,
            account INT NOT NULL
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE carts`)
        await queryRunner.query(`DROP TABLE banks`)
    }
}
