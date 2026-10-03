import { db } from "../../database/database.ts";



export class GetUserUseCase {

    async execute(params: { id: string; email: string }): Promise<any> {
        const { id, email } = params

        if (id){
            const getUserById = await db.orm.public.User.where({id: id}).first()
            return getUserById      
        }
        else if (email){
            const getUserByEmail = await db.orm.public.User.where({email: email}).first()
            return getUserByEmail
        }
        else{
            throw new Error("Please provide either id or email to fetch user")
        }
    }
}