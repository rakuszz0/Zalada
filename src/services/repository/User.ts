import DatabaseService from "@infrastructure/database"
import * as UserTypes from "../models/User/type"

const db = DatabaseService.getDatasource()

export async function DBGetUsers() {
    const query = await db.query<UserTypes.GetUserResponse[]>("SELECT id, username, email, phone_number, address, registered_date FROM users")
    return query
}

export async function DBCheckUserExist(user_id: number) {
  const query = await db.query<UserTypes.User[]>("SELECT * FROM users WHERE id = ?", [user_id])
  return query
}

export async function DBGetStaffs() {
    const query = await db.query<UserTypes.GetUserResponse[]>(
      "SELECT id, username, email, phone_number, address, registered_date FROM users WHERE user_level = 2"
    )

    return query
}