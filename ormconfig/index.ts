import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Bank } from "./models/Bank";
import { Cart } from "./models/Cart";
import { Product } from "./models/Product";
import { Role } from "./models/Role";
import { Store } from "./models/Store";
import { Transaction } from "./models/Transaction";

export default new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Transaction, User, Bank, Cart, Product, Role, Store],
    migrations: ["dist/ormconfig/migrations/*.js"],
})