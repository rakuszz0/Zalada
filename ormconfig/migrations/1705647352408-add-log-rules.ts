import { ListRules } from "src/config/rules"
import { MigrationInterface, QueryRunner } from "typeorm"

export class AddLogRules1705647352408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const rules = [
            [ListRules.ACCESS_VIEW_LOG, 'ACCESS_VIEW_LOG']
        ]
        await queryRunner.query('INSERT INTO user_rules (id, name) VALUES ?', [rules])

        const user_rules = [
            [1, ListRules.ACCESS_VIEW_LOG] // Rules super_admin access view log
        ]

        await queryRunner.query(`INSERT INTO user_group_rules (role_id, rules_id) VALUES ?`, [user_rules])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
