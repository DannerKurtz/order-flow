
export class GetUserController {
    private getUserUseCase: GetUserUseCase
    constructor(getUserUseCase: GetUserUseCase) {
        this.getUserUseCase = getUserUseCase
    }

    async execute(request:any, reply:any): Promise<any> {
        try {
            const { id, email }: { id: string; email: string } = request.query

            const userData = await this.getUserUseCase.execute({ id, email })

            return reply.status(200).send(userData)
        } catch (error) {
            return reply.status(500).send({ error: "Internal server error" })
        }
    }

    
}