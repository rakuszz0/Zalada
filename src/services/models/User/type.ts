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

export type GetUserResponse = Omit<User, 'password' | "user_level">

export type AddProductByAdmin = {
    id:number;
    name:string;
    stock:number;
    description:string;
    price:number
    store_id:number
}