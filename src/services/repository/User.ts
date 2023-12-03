import db from "@database"
import * as UserTypes from "../models/User/type"

export async function DBGetUsers() {
    const query = await db.query<UserTypes.GetUserResponse[]>("SELECT id, username, email, phone_number, address, registered_date FROM users")
    return query
}

export async function DBGetStaffs() {
    const query = await db.query<UserTypes.GetUserResponse[]>(
      "SELECT id, username, email, phone_number, address, registered_date FROM users WHERE user_level = 2"
    )

    return query
}