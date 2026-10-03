import {UserCreateRepository} from "./create-user.ts"
import {GetUserByIdRepository} from "./get-user-by-id.ts"

export const userRepository = { userCreateRepository: UserCreateRepository, getUserByIdRepository: GetUserByIdRepository }