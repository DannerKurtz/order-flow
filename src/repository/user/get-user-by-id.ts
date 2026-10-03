import { db } from "../../database/database.ts"


export class GetUserByIdRepository{

    async execute(id: string): Promise<any> {
        const getUserById = await db.orm.public.User.where({id: id}).first()
        return getUserById
    }
}