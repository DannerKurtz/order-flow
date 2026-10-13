import { db } from "../../database/database.ts";


export class UpdateUserByIdRepository {
    async execute (id: string, body: any) {
        const updateUser = await db.orm.public.User.where({id}).update({
            email: body.email,
            password: body.password,
            firstName: body.first_name,
            lastName: body.last_name,
        })
        return updateUser
    }
}