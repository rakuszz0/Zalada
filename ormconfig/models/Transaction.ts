import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bank } from "./Bank";
import { User } from "./User";
import { Product } from "./Product";

export enum TransactionStatus {
  VERIFICATION = 0,
  PACKING = 1,
  ONWAY = 2,
  ARRIVED = 3,
  CANCELLED = 4,
}

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_no: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  order_time: number;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.VERIFICATION,
  })
  status: number;

  @ManyToOne(() => Product, (product) => product.transactions)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: "consumer_id" })
  consumer: User;

  @ManyToOne(() => Bank, (bank) => bank.transactions)
  @JoinColumn({ name: "payment_type" })
  bank: Bank;

  @ManyToOne(() => User)
  @JoinColumn({ name: "verified_by" })
  verified_by: User;
}
