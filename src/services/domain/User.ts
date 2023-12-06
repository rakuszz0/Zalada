import { NotFoundError, ServerError } from "src/config/error";
import * as UserTypes from '../models/User'
import * as UserRepository from "../repository/User";
import * as UserTypes from "../models/User/type"


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

export async function addProductByAdmin(params:UserTypes.AddProductByAdmin) {
  const addProductByAdmin = await UserRepository.DBAddProductByAdmin(params)
  return addProductByAdmin
}

export async function getStaffsDomain() {
    return await UserRepository.DBGetStaffs()
}

export async function checkUserExistByEmailDomain(email: string) {
  const user = await UserRepository.DBCheckUserExistByEmail(email)

  if (user.length < 1) {
    throw new NotFoundError("USER_NOT_FOUND")
  }

  return user[0]
}
