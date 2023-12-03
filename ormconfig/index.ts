import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm";
import { Bank, Cart, Product, Role, Store, Transaction, User } from "./models";

export default new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Transaction, User, Bank, Cart, Product, Role, Store],
    migrations: ["dist/ormconfig/migrations/*.js"],
})