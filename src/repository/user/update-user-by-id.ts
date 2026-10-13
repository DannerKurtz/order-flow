import { db } from "../../database/database.ts";


export class UpdateUserByIdRepository {
    async execute (id: string, body: any) {
        const updateUser = await db.orm.public.User.where({id}).update(body)
        return updateUser
    }
}