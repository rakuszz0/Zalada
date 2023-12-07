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

        // Create banks table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS banks (
            id INT PRIMARY KEY AUTO_INCREMENT,
            bank_name VARCHAR(255) UNIQUE,
            account VARCHAR(20) NOT NULL
            );`
        )

        // Create stores
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS stores (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(255) NOT NULL
            );`
        )

        //Create products
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS products (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(75) NOT NULL,
            quantity INT NOT NULL,
            description TEXT,
            price INT NOT NULL,
            store_id INT NOT NULL,
            FOREIGN KEY (store_id) REFERENCES stores(id)
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

        //create carts table
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS carts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                product_id INT NOT NULL,
                quantity INT,
                customer_id INT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (customer_id) REFERENCES users(id)
            );`
        )

        // Create transactions table
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS transactions (
            id INT PRIMARY KEY AUTO_INCREMENT,
            order_no VARCHAR(20) NOT NULL,
            order_time DATETIME DEFAULT CURRENT_TIMESTAMP,
            status ENUM('0', '1', '2', '3', '4', '5') NOT NULL,
            product_id INT NOT NULL,
            customer_id INT NOT NULL,
            payment_type INT NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (customer_id) REFERENCES users(id),
            FOREIGN KEY (payment_type) REFERENCES banks(id)
        );`)

        const { insertId: super_admin }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["super_admin"])
        const { insertId: staff_shipping }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["staff_shipping"])
        const { insertId: staff_inventory }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["staff_inventory"])
        const { insertId: staff_transaction }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["staff_transaction"])
        const { insertId: customer }: ResultSetHeader = await queryRunner.query("INSERT INTO user_roles (name) VALUES (?)", ["customer"])

        const users = [
            ["superadmin", "superadmin@gmail.com", await hashPassword("superadmin"), super_admin],
            ["staffinv", "staffinv@gmail.com", await hashPassword("12345"), staff_inventory],
            ["stafftrans", "stafftrans@gmail.com", await hashPassword("12345"), staff_transaction],
            ["staffkurir", "staffkurir@gmail.com", await hashPassword("12345"), staff_shipping],
            ["consumer", "consumer@gmail.com", await hashPassword("12345"), customer]
        ]

        await queryRunner.query("INSERT INTO users (username, email, password, user_level) VALUES ?", [users])

        await queryRunner.query("INSERT INTO stores (name, address) VALUES (?, ?)", ["Zalada", "Jl. Pahlawan No. 123, Jakarta Barat DKI Jakarta, 12345 "])



        const values = [
            ["BCA", "2210089856"],
            ["BRI", "1234567890"],
            ["BNI", "7876766738"],
            ["Mandiri", "9876543210"]  
        ];
          
        
        await queryRunner.query("INSERT INTO banks (bank_name, account) VALUES ?", [values]);
        
          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE carts`)
        await queryRunner.query(`DROP TABLE banks`)
    }
}
