import { MigrationInterface, QueryRunner } from "typeorm"

export class AddDeliveredBy1702885321090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE transactions ADD COLUMN delivered_by INT AFTER verified_by`)

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            customer_id INT NOT NULL,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE transactions DROP COLUMN delivered_by`);

        // Drop the 'reviews' table
        await queryRunner.query(`DROP TABLE IF EXISTS reviews`);
    }

}
