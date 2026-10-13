


export class UpdateUserController {
    private updateUserUseCase: any;
    constructor(updateUserUseCase: any) {
        this.updateUserUseCase = updateUserUseCase
    }

    async execute(request: any, reply: any) {
        try {
            const id = request.params.id;
            const body = request.body;  
            const updateUser = await this.updateUserUseCase.execute(id, body)
            reply.status(200).send(updateUser)
        } catch (error) {
            reply.status(400).send({ error: error })
        }


    }
}