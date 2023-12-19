import DatabaseService from "@infrastructure/database"
import * as UserTypes from "../models/User/type"
import { ResultSetHeader } from "mysql2"
import { QueryRunner } from "typeorm"
import { NotFoundError, ServerError } from "src/config/error"

const db = DatabaseService.getDatasource()

export async function DBGetUsers() {
  const query = await db.query<UserTypes.GetUserResponse[]>("SELECT id, username, email, phone_number, address, registered_date FROM users")
  return query
}

export async function DBCheckUserExist(user_id: number) {
  const query = await db.query<UserTypes.User[]>("SELECT * FROM users WHERE id = ?", [user_id])

  if(query.length < 1) {
    throw new NotFoundError("USER_NOT_FOUND")
  }

  return query[0]
}

export async function DBGetStaffs() {
    const query = await db.query<UserTypes.GetUserResponse[]>(
      "SELECT id, username, email, phone_number, address, registered_date FROM users WHERE user_level = 2"
    )

    return query
}


export async function DBCheckUserExistByEmail(email: string) {
  const query = await db.query<UserTypes.User[]>("SELECT * FROM users WHERE email = ?", [email])

  if(query.length < 1) {
    throw new NotFoundError("EMAIL_ALREADY_EXIST")
  }

  return query[0]
}

export async function DBGetUserRules(user_id: number) {
  return await db.query<Array<{ rules_id: number, rules_name: string }>>(`SELECT ugr.rules_id rules_id, uru.name rules_name FROM users u LEFT JOIN user_roles ur ON ur.id = u.user_level INNER JOIN user_group_rules ugr ON ugr.role_id = ur.id LEFT JOIN user_rules uru ON uru.id = ugr.rules_id WHERE u.id = ?`, [user_id])
}

export async function DBCreateUserByAdmin(params:UserTypes.CreateUserByAdmin){
  const {username,email,first_name,last_name,password,user_level} = params
  const query = await db.query<ResultSetHeader>(
    "INSERT INTO users( username,email,first_name,last_name,password,user_level ) VALUES (?,?,?,?,?,?)",[username,email,first_name,last_name,password,user_level]
  )
  return query
}

export async function DBRegister({ address, email, password, phone_number, username, first_name, last_name }: UserTypes.RegisterQueryParams) {
  const [customerRole] = await db.query<Array<{ id: number, name: string }>>("SELECT * FROM user_roles WHERE name = ?", ['customer'])
  const params = [
    [username, email, password, first_name, last_name, phone_number, address, customerRole.id]
  ]
  const query = await db.query<ResultSetHeader>("INSERT INTO users (username, email, password, first_name, last_name, phone_number, address, user_level) VALUES ?", [params])

  if(query.affectedRows < 1) {
    throw new ServerError("FAILED_REGISTER")
  }

  return query
}

export async function changePassword(params:UserTypes.ChangePassQueryParams,queryRunner:QueryRunner){
  const {user_id,new_password} = params
  const query = await db.query<ResultSetHeader>(
    "UPDATE users SET password = ? WHERE id = ? ",[new_password, user_id, queryRunner]
  )
  return query
}

export async function DBGetRoles() {
  return await db.query<Array<{ id: number, name: string }>>("SELECT id, name FROM user_roles")
}

export async function DBGetRules() {
  return await db.query<{ id: number, name: string }>(`SELECT id, name FROM user_rules`)
}

export async function DBCheckRulesExist(rules_id: number) {
  const query = await db.query<Array<{id: number, name: string}>>(`SELECT id, name FROM user_rules WHERE id = ?`, [rules_id])

  if(query.length < 1) {
    throw new NotFoundError("RULES_NOT_FOUND")
  }

  return query[0]
}

export async function DBGetGroupRules(role_id: number) {
  return await db.query<Array<{rules_id: number, rules_name: string}>>(`SELECT ur.id rules_id, ur.name rules_name FROM user_group_rules ugr LEFT JOIN user_rules ur ON ur.id = ugr.rules_id WHERE ugr.role_id = ?`, [role_id])
}

export async function DBCheckUserLevel(id: number) {
  const query = await db.query<UserTypes.CheckRoles[]>(
    "SELECT id FROM user_roles WHERE id = ?", [id]
  )

  if (query.length < 1) {
    throw new NotFoundError("USER_LEVEL_NOT_EXIST")
  }

  return query[0]
}

export async function DBAddGroupRules({role_id, rules_id}: UserTypes.AddGroupRulesQueryParams, queryRunner?: QueryRunner) {
  const values = [
    [rules_id, role_id]
  ]

  const query = await db.query<ResultSetHeader>(`INSERT INTO user_group_rules (rules_id, role_id) VALUES ?`, [values], queryRunner)

  if(query.affectedRows < 1) {
    throw new ServerError("FAILED_TO_ADD_NEW_RULES")
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

