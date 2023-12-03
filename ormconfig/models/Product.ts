import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Store } from "./Store";
import { Transaction } from "./Transaction";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transactions: Transaction[];

  @OneToMany(() => Cart, (cart) => cart.product)
  on_cart: Cart[];

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: "store_id" })
  store: Store;
}
