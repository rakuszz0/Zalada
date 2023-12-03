import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Cart } from "./Cart";
import { Transaction } from "./Transaction";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: number;

  @Column({ nullable: true })
  address: string;

  @CreateDateColumn()
  registered_date: Date

  @ManyToOne(() => Role)
  @JoinColumn({ name: "user_level" })
  role: Role;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => Transaction, (transaction) => transaction.consumer)
  transactions: Transaction[];
}
