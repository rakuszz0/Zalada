import * as z from 'zod'
import { changePassRequest, createGroupRules, editUserRequest, loginRequest, registerRequest, restoreTrashedUser } from './schema'

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

export type RegisterQueryParams = {
    username: string
    email: string
    password: string
    phone_number: string
    address: string
    first_name: string
    last_name: string
}

export type LoginRequest = z.infer<typeof loginRequest>

export type RegisterRequest = z.infer<typeof registerRequest>

export type GetUserResponse = Omit<User, 'password' | "user_level">

export type CheckUserByUsernameOrEmailParams = {
    username: string
    email: string
}


export type CreateUserByAdmin = {
    username:string;
    email:string;
    first_name:string,
    last_name:string,
    password:string;
    password_confirmation:string;
    user_level:number;
}

export type ChangePassRequest = z.infer<typeof changePassRequest> & {user_id:number}

export type ChangePassQueryParams ={
    new_password:string;
    user_id:number;
}

export type CreateRulesRequest = z.infer<typeof createGroupRules>

export type CreateRulesDomainParams = CreateRulesRequest

export type AddGroupRulesQueryParams = {
    rules_id: number
    role_id: number
}

export type CheckRoles = {
    id: number
    name: string
}

export type LoginDomain = LoginRequest

export type RegisterDomain = RegisterRequest

export type EditUserRequest = z.infer<typeof editUserRequest> 

export type EditUserDomain = EditUserRequest

export type EditUserQueryParams = {
    id:number;
    email: string;
    first_name:string;
    last_name: string;
    username: string;
    user_level: number;
    phone_number:string;
    address:string;
}

export type RestoreTrashedUser = z.infer<typeof restoreTrashedUser>

export type GetTrashedUserQueryParams = {
    id:number
}

export type RestoreTrashedUserQueryParams = {
    id:number
    username:string;
    email:string;
    first_name:string,
    last_name:string,
    password:string;
    phone_number:string;
    registered_date:number;
    address:string;
    user_level:number;
}
