import { NotFoundError, ServerError } from "src/config/error";
import * as UserRepository from "../repository/User";
import * as UserTypes from "../models/User/type"
import * as UserDto from "src/services/models/User";
import * as ProductDto from "../models/Product";
import * as ProductRepository from "../repository/Product";




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

export async function addProductByAdmin(params:ProductDto.AddProductByAdmin) {
  const addProductByAdmin = await ProductRepository.DBAddProductByAdmin(params)
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

export async function checkEmailExistDomain(email:string){
  const emailExist = await UserRepository.DBCheckUserExistByEmail(email)

  return emailExist[0]
}

export async function register(user: UserDto.registerParams) {
  const result = await UserRepository.DBRegister(user);

  if (result.affectedRows < 1) {
    throw new NotFoundError("USER_NOT_FOUND")
  }

  return result.insertId;
}


export async function createUserByAdmin(params:UserTypes.CreateUserByAdmin){
  const createUserByAdmin = await UserRepository.DBCreateUserByAdmin(params)

  return createUserByAdmin
}