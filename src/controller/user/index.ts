import {UserCreateController} from './create-user.ts';
import {GetUserController} from './get-user.ts';
import { UpdateUserController } from './update-user.ts';

export const user = { userCreateController: UserCreateController, getUserController: GetUserController, updateUserController: UpdateUserController };