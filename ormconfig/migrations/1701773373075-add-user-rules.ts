import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUserRules1701773373075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_rules (
            id INT PRIMARY KEY AUTO_INCREMENT
            access_id INT NOT NULL
            name VARCHAR(255) NOT NULL
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
