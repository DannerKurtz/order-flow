import {UserCreateRepository} from "./create-user.ts"
import {GetUserByIdRepository} from "./get-user-by-id.ts"
import {GetUserByEmailRepository} from "./get-user-by-email.ts"
import {UpdateUserByIdRepository} from "./update-user-by-id.ts"

export const userRepository = { userCreateRepository: UserCreateRepository, getUserByIdRepository: GetUserByIdRepository, getUserByEmailRepository: GetUserByEmailRepository, updateUserByIdRepository: UpdateUserByIdRepository }