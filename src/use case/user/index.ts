import {UserCreateUseCase} from "./create-user.ts"
import { DeleteUserByIdUseCase } from "./delete-user-by-id.ts"
import {GetUserUseCase} from "./get-user.ts"
import {UpdateUserUseCase} from "./update-user-by-id.ts"

export const userUseCase = {
    userCreateUserCase: UserCreateUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    deleteUserByIdUseCase: DeleteUserByIdUseCase
}