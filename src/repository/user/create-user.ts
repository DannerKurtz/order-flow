import { db } from "../../database/database.ts"


export class UserCreateRepository {

    async execute(data: any): Promise<any> {
        const createdUserInDatabase = await db.orm.public.User.create({...data})
        return createdUserInDatabase
    }
}