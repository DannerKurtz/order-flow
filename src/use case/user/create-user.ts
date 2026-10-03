import { db } from "../../database/database.ts"
import type { UserCreateRepository } from "../../repository/user/create-user.ts"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"
export class UserCreateUseCase {
    private userCreateRepository: UserCreateRepository
    private getUserByEmailRepository: any
    constructor(userCreateRepository: UserCreateRepository, getUserByEmailRepository: any) {
        this.userCreateRepository = userCreateRepository
        this.getUserByEmailRepository = getUserByEmailRepository
    }
    async execute(data: any): Promise<any> {

        const userExists = await this.getUserByEmailRepository.execute(data.email)
        const saltRounds = 10
        const saltGenerated = await bcrypt.genSalt(saltRounds)
        const idGenerated = uuidv4()
        if (userExists) {
            throw new Error("User with this email already exists")
        }
        const hasedPassword = await bcrypt.hash(data.password, saltGenerated)
        const userData = {
            id: idGenerated,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            password: hasedPassword,
        }

        const createdUserInDatabase = await this.userCreateRepository.execute(userData)
        console.log("createdUserInDatabase", createdUserInDatabase)
    return createdUserInDatabase
    }
}
