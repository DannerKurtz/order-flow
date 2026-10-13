import {UserCreateUseCase} from "./create-user.ts"
import {GetUserUseCase} from "./get-user.ts"
import {UpdateUserUseCase} from "./update-user-by-id.ts"

export const userUseCase = {
    userCreateUserCase: UserCreateUseCase,
    getUserUseCase: GetUserUseCase,
    updateUserUseCase: UpdateUserUseCase
}