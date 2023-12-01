import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity({ name: "banks" })
export class Bank {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    account: string

    @OneToMany(() => Transaction, (transaction) => transaction.bank)
    transactions: Transaction[]
}