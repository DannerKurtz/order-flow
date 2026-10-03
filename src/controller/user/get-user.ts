import type { GetUserUseCase } from "../../use case/user/get-user.ts";

export class GetUserController {
    private getUserUseCase: GetUserUseCase
    constructor(getUserUseCase: GetUserUseCase) {
        this.getUserUseCase = getUserUseCase
    }

    async execute(request:any, reply:any): Promise<any> {
        try {

            const userData = await this.getUserUseCase.execute(request.query    )

            return reply.status(200).send(userData)
        } catch (error) {
            return reply.status(500).send({ error: "Internal server error" })
        }
    }

    
}