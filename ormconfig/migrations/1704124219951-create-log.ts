import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateLog1704124219951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS logs (
                id INT PRIMARY KEY AUTO_INCREMENT,
                method VARCHAR(10) NOT NULL,
                url VARCHAR(50) NOT NULL,
                user_id INT NOT NULL,
                ip VARCHAR(20) NOT NULL,
                params TEXT,
                time INT NOT NULL
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS logs
        `);
    }

}
