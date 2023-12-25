import { MigrationInterface, QueryRunner } from "typeorm"

export class AddRatingsReview1702967305733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE reviews ADD COLUMN rating INT AFTER customer_id`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE reviews DROP COLUMN rating`);
    }
}
