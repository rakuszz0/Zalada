import { MigrationInterface, QueryRunner } from "typeorm"

export class AddressOnOrder1706000553569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE transactions
            ADD COLUMN address VARCHAR(255) NOT NULL,
            ADD COLUMN notes VARCHAR(255)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE transactions
            DROP COLUMN address,
            DROP COLUMN notes
        `);

    }

}
