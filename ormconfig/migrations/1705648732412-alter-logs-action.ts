import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterLogsAction1705648732412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE logs MODIFY action VARCHAR(255)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
