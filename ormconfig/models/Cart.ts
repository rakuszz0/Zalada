import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({ name: "carts" })
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    quantity: number

    @ManyToOne(() => User, (user) => user.cart)
    user: User

    @ManyToOne(() => Product, (product) => product.on_cart)
    product: Product
}