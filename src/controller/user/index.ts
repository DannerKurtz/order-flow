import {UserCreateController} from './create-user.ts';
import { DeleteUserByIdController } from './delete-user-by-id.ts';
import {GetUserController} from './get-user.ts';
import { UpdateUserController } from './update-user.ts';

export const user = { userCreateController: UserCreateController, getUserController: GetUserController, updateUserController: UpdateUserController, deleteUserByIdController: DeleteUserByIdController };