import { MigrationInterface, QueryRunner } from "typeorm"

export class AddColumnLog1704682385981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE logs ADD COLUMN action VARCHAR(30)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE logs DROP COLUMN action`);
    }

}
