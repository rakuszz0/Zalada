import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({ name: "user_roles" })
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @OneToMany(() => User, (user) => user.user_level)
    users: User[]
}