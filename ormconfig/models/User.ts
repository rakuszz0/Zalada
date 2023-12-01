import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Cart } from "./Cart";
import { Transaction } from "./Transaction";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    phone_number: number

    @Column()
    address: string

    @ManyToOne(() => Role, (role) => role.id)
    user_level: Role

    @ManyToOne(() => Cart, (cart) => cart.user)
    carts: Cart[]

    @ManyToOne(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[]
}