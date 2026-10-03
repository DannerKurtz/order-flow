
export class GetUserUseCase {
    private getUserByIdRepository: any;
    private getUserByEmailRepository: any;
    constructor(getUserByIdRepository: any, getUserByEmailRepository: any){
        this.getUserByIdRepository = getUserByIdRepository
        this.getUserByEmailRepository = getUserByEmailRepository
    }

    async execute(params: { id: string; email: string }): Promise<any> {
        const { id, email } = params

        if (id){
            const getUserById = await this.getUserByIdRepository.execute(id)
            return getUserById      
        }
        else if (email){
            const getUserByEmail = await this.getUserByEmailRepository.execute(email)
            return getUserByEmail
        }
        else{
            throw new Error("Please provide either id or email to fetch user")
        }
    }
}