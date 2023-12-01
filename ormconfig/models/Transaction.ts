import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bank } from "./Bank";
import { User } from "./User";
import { Product } from "./Product";

enum TransactionStatus {
    PACKING = 1,
    ONWAY = 2,
    ARRIVED = 3,
    CANCELLED = 4
}

@Entity({ name: "transactions" })
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    order_no: string

    @Column()
    quantity: number

    @CreateDateColumn()
    order_time: number

    @Column({
        type: "enum",
        enum: TransactionStatus,
        default: TransactionStatus.PACKING
    })
    status: number

    @ManyToOne(() => Product, (product) => product.transactions)
    product: Product

    @ManyToOne(() => User, (user) => user.transactions)
    user: User

    @ManyToOne(() => Bank, (bank) => bank.transactions)
    bank: Bank
}