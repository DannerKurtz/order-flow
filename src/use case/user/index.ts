import {UserCreateUseCase} from "./create-user.ts"
import {GetUserUseCase} from "./get-user.ts"

export const userUseCase = {
    userCreateUserCase: UserCreateUseCase,
    getUserUseCase: GetUserUseCase,
}