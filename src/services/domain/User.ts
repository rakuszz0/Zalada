import * as UserRepository from "../repository/User";

export async function getUsersDomain() {
  return await UserRepository.DBGetUsers()
}

export async function getStaffsDomain() {
    return await UserRepository.DBGetStaffs()
}
