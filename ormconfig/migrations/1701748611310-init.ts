import { ResultSetHeader } from "mysql2"
import {hashPassword} from "../../src/utils/password"
import { MigrationInterface, QueryRunner } from "typeorm"

export class Init1701748611310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Create user roles
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_roles (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL
            );`
        )

        // Create users table 
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20),
            registered_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            address VARCHAR(255),
            user_level INT NOT NULL,
            FOREIGN KEY (user_level) REFERENCES user_roles(id)
            );`
        )

        // Create transactions table
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS transactions (
            id INT PRIMARY KEY AUTO_INCREMENT,
            order_no VARCHAR(20) NOT NULL,
            order_time DATETIME DEFAULT CURRENT_TIMESTAMP,
            status ENUM(0, 1, 2, 3, 4, 5) NOT NULL,
            product_id INT NOT NULL,
            customer_id INT NOT NULL,
            payment_type INT NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (customer_id) REFERENCES users(id),
            FOREIGN KEY (payment_type) REFERENCES banks(id)
        );`)

        const { insertId: super_admin }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["super_admin"])
        const { insertId: admin }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["admin"])
        const { insertId: staff }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["staff"])
        const { insertId: customer }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["customer"])

        const users = [
            ["superadmin", "superadmin@gmail.com", await hashPassword("superadmin"), super_admin],
            ["admin", "admin@gmail.com", await hashPassword("admin"), admin],
            ["staff", "stafftoko@gmail.com", await hashPassword("stafftoko"), staff],
        ]

        if (process.env.NODE_ENV == "development") {
            // Add example user
            users.push(
                ["stafftoko2", "stafftoko2@gmail.com", await hashPassword("stafftoko2"), staff],
                ["stafftoko3", "stafftoko3@gmail.com", await hashPassword("stafftoko3"), staff],
                ["customer", "customer@gmail.com", await hashPassword("customer"), customer],
                ["customer1", "customer1@gmail.com", await hashPassword("customer1"), customer],
                ["customer2", "customer2@gmail.com", await hashPassword("customer2"), customer],
                ["customer3", "customer3@gmail.com", await hashPassword("customer3"), customer],
                ["customer4", "customer4@gmail.com", await hashPassword("customer4"), customer]
            )
        }



        await queryRunner.query("INSERT INTO users (username, email, password, user_level) VALUES ?", [users])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
