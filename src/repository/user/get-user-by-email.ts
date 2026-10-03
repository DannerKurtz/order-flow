import { db } from "../../database/database.ts"


export class GetUserByEmailRepository{

    async execute(email: string): Promise<any> {
        const getUserById = await db.orm.public.User.where({email: email}).first()
        return getUserById
    }
}