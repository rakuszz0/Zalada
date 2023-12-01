import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Cart } from "./Cart"
import { Store } from "./Store"
import { Transaction } from "./Transaction"

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    quantity: number

    @Column()
    description: string

    @Column()
    price: number

    @OneToMany(() => Transaction, (transaction) => transaction.product)
    transactions: Transaction[]

    @OneToMany(() => Cart, (cart) => cart.product)
    on_cart: Cart[]

    @ManyToOne(() => Store, (store) => store.products)
    store: Store
}