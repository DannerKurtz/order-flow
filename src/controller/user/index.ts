import {UserCreateController} from './create-user.ts';
import {GetUserController} from './get-user.ts';

export const user = { userCreateController: UserCreateController, getUserController: GetUserController };