import { userRepository } from "../../repository/user/index.ts"


export class UpdateUserUseCase {
    private getUserByEmailRepository: any;
    private updateUserByIdRepository: any;
    constructor(getUserByEmailRepository: any, updateUserByIdRepository: any){
        this.getUserByEmailRepository = getUserByEmailRepository
        this.updateUserByIdRepository = updateUserByIdRepository
    }

    async execute(id: string, body: any): Promise<any> {
        const userData = {
            email: body.email,
            password: body.password,
            firstName: body.first_name,
            lastName: body.last_name,
        }
        const emailVerify = await this.getUserByEmailRepository.execute(body.email)
        if(emailVerify && emailVerify.id !== id) {
            throw new Error("Email already exists")
        }
        const updatePassword = body.password
        if(updatePassword) {
            const bcrypt = await import("bcrypt")
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(updatePassword, saltRounds)
            userData.password = hashedPassword
        }
        
        const updateUser = await this.updateUserByIdRepository.execute(id, userData)
        return updateUser
    }
}