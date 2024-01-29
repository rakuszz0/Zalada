import { ListRules } from "../../src/config/rules"
import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUserRules1701856047373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_rules (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )`)

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_group_rules (
            role_id INT,
            rules_id INT,
            FOREIGN KEY (role_id) REFERENCES user_roles(id),
            FOREIGN KEY(rules_id) REFERENCES user_rules(id)
        )`)

        await queryRunner.query(`INSERT INTO user_rules (name, id) VALUES ?`, [
            Object.entries(ListRules)
        ])

        // Add super admin rules
        await queryRunner.query(`INSERT INTO user_group_rules (role_id, rules_id) VALUES ?`, [
            [
                ListRules.ACCESS_VIEW_PRODUCT,
                ListRules.ACCESS_CREATE_PRODUCT,
                ListRules.ACCESS_EDIT_PRODUCT,
                ListRules.ACCESS_DELETE_PRODUCT,
                ListRules.ACCESS_HANDLE_TRANSACTION,
                ListRules.ACCESS_HANDLE_SHIPPING,
                ListRules.ACCESS_VIEW_USER,
                ListRules.ACCESS_CREATE_USER,
                ListRules.ACCESS_EDIT_USER,
                ListRules.ACCESS_DELETE_USER,
                ListRules.ACCESS_VIEW_RULES,
                ListRules.ACCESS_CREATE_RULES,
                ListRules.ACCESS_EDIT_RULES,
                ListRules.ACCESS_DELETE_RULES
            ].map(rule => [1, rule])
        ])

        // add staff shipping rules
        await queryRunner.query(`INSERT INTO user_group_rules (role_id, rules_id) VALUES ?`, [
            [ListRules.ACCESS_HANDLE_SHIPPING].map(rule => [2, rule])
        ])

        // add staff inventory rules
        await queryRunner.query(`INSERT INTO user_group_rules (role_id, rules_id) VALUES ?`, [
            [ListRules.ACCESS_VIEW_PRODUCT, ListRules.ACCESS_CREATE_PRODUCT, ListRules.ACCESS_EDIT_PRODUCT].map(rule => [3, rule])
        ])

        // add staff_transactions rules
        await queryRunner.query(`INSERT INTO user_group_rules (role_id, rules_id) VALUES ?`, [
            [ListRules.ACCESS_HANDLE_TRANSACTION].map(rule => [4, rule])
        ])

        // add staff_customer rules
        await queryRunner.query(`INSERT INTO user_group_rules (role_id, rules_id) VALUES ?`, [
            [ListRules.ACCESS_VIEW_USER, ListRules.ACCESS_CREATE_USER, ListRules.ACCESS_EDIT_USER, ListRules.ACCESS_DELETE_USER].map(rule => [5, rule])
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user_group_rules`)
        await queryRunner.query(`DROP TABLE IF EXISTS user_rules`)

    }

}
