import { MigrationInterface, QueryRunner } from "typeorm"

export class Init1701748611310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create stores
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS stores (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(255) NOT NULL
            );`
        )

        //Create products
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS products (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(75) NOT NULL,
            quantity INT NOT NULL,
            description TEXT,
            price INT NOT NULL,
            store_id INT NOT NULL,
            FOREIGN KEY (store_id) REFERENCES stores(id)
            );`
        )

        await queryRunner.query("INSERT INTO stores (name, address) VALUES (?, ?)", ["Zalada", "Jl. Pahlawan No. 123, Jakarta Barat DKI Jakarta, 12345 "])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
