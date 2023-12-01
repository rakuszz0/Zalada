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

    @ManyToOne(() => Role, (role) => role.users)
    user_level: Role

    @OneToMany(() => Cart, (cart) => cart.user)
    cart: Cart[]

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[]
}