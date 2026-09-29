import { db } from "../../database/database.ts"
import bcrypt from "bcrypt"
export class UserCreateUseCase {
    async execute(data: any): Promise<any> {

        const userExists = await db.orm.public.User.where({email: data.email}).first()
        const saltRounds = 10
        const saltGenerated = await bcrypt.genSalt(saltRounds)
        if (userExists) {
            throw new Error("User with this email already exists")
        }
        const hasedPassword = await bcrypt.hash(data.password, saltGenerated)

        const createdUserInDatabase = await db.orm.public.User.create({
            id: data.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            password: hasedPassword,
    })
    console.log("createdUserInDatabase", createdUserInDatabase)
    return createdUserInDatabase
    }
}