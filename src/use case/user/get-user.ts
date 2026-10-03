import { db } from "../../database/database.ts";



export class GetUserUseCase {
    private getUserByIdRepository: any;
    constructor(getUserByIdRepository: any){
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(params: { id: string; email: string }): Promise<any> {
        const { id, email } = params

        if (id){
            const getUserById = await this.getUserByIdRepository.execute(id)
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