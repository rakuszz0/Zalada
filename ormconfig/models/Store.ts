import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity({ name: "stores" })
export class Store {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string

    @OneToMany(() => Product, (product) => product.store)
    products: Product[]
}