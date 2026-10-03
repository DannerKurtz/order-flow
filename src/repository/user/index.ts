import {UserCreateRepository} from "./create-user.ts"
import {GetUserByIdRepository} from "./get-user-by-id.ts"
import {GetUserByEmailRepository} from "./get-user-by-email.ts"

export const userRepository = { userCreateRepository: UserCreateRepository, getUserByIdRepository: GetUserByIdRepository, getUserByEmailRepository: GetUserByEmailRepository }