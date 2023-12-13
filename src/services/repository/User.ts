import DatabaseService from "@infrastructure/database"
import * as UserTypes from "../models/User/type"
import { ResultSetHeader } from "mysql2"
import { NotFoundError, ServerError } from "src/config/error";

const db = DatabaseService.getDatasource()

export async function DBGetUsers() {
  const query = await db.query<UserTypes.GetUserResponse[]>("SELECT id, username, email, phone_number, address, registered_date FROM users")
  return query
}

export async function DBCheckUserExist(user_id: number): Promise<UserTypes.User[]> {
  const query = await db.query<UserTypes.User[]>("SELECT * FROM users WHERE id = ?", [user_id])
  if (query.length < 1 ){
    throw new NotFoundError("USER_NOT_FOUND")
  }

  return query
}

export async function DBGetStaffs() {
    const query = await db.query<UserTypes.GetUserResponse[]>(
      "SELECT id, username, email, phone_number, address, registered_date FROM users WHERE user_level = 2"
    )

    return query
}


export async function DBCheckUserExistByEmail(email: string) {
  const query = await db.query<UserTypes.User[]>("SELECT * FROM users WHERE email = ?", [email])
  return query
}

export async function DBGetUserRules(user_id: number) {
  const query = await db.query<Array<{ rules: number }>>(`SELECT ugr.rules_id rules FROM users u LEFT JOIN user_roles ur ON ur.id = u.user_level LEFT JOIN user_group_rules ugr ON ugr.role_id = ur.id  WHERE u.id = ?`, [user_id])
  return query.map(rule => rule.rules)
}

export async function DBCreateUserByAdmin(params:UserTypes.CreateUserByAdmin){
  const {username,email,password,user_level} = params
  const query = await db.query<ResultSetHeader>(
    "INSERT INTO users( username,email,password,user_level ) VALUES (?,?,?,?)",[username,email,password,user_level]
  )

  return query
}

export async function DBCheckUserLevel(id:number){
  const query = await db.query<UserTypes.CheckRoles[]>(
    "SELECT id FROM user_roles WHERE id = ?",[id]
  )

  if(query.length < 1) {
    throw new NotFoundError("USER_LEVEL_NOT_EXIST")
  }
  return query
}

export async function DBEditUserByAdmin({id,user_level,username,email,first_name,last_name,phone_number,address}:UserTypes.EditUserQueryParams){
  
  const values=[user_level,username,email,first_name,last_name,phone_number,address,id] 
  const query = await db.query<ResultSetHeader>(
    "UPDATE users SET user_level = ?,username = ?,email = ?,first_name = ?,last_name =?,phone_number=?,address = ? WHERE id=? ",
    values
  )

  return query
}