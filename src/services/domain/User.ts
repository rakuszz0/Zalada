import { NotFoundError } from "src/config/error";
import * as UserRepository from "../repository/User";

export async function getUsersDomain() {
  return await UserRepository.DBGetUsers()
}

export async function checkUserExistDomain(user_id: number) {
  const user = await UserRepository.DBCheckUserExist(user_id)

  if(user.length < 1) {
    throw new NotFoundError("USER_NOT_FOUND")
  }

  return user[0]
}

export async function getStaffsDomain() {
    return await UserRepository.DBGetStaffs()
}
