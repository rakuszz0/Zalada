import * as z from 'zod'
import { loginRequest, registerRequest } from './schema'

export type User = {
    id: number
    username: string
    email: string
    password: string
    phone_number: string
    address: string
    registered_date: Date
    user_level: number
}

export type registerParams = {
    username: string
    email: string
    password: string
    phone_number: string
    address: string
    user_level: number
}

export type LoginRequest = z.infer<typeof loginRequest>

export type RegisterRequest = z.infer<typeof registerRequest>

export type GetUserResponse = Omit<User, 'password' | "user_level">

export type CheckUserByUsernameOrEmailParams = {
    username: string
    email: string
}

export type AddProductByAdmin = {
    name:string;
    stock:number;
    description:string;
    price:number
}