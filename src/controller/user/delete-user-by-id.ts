

export class DeleteUserByIdController{
    private deleteUserByIdUseCase: any

    constructor(deleteUserByIdUseCase: any){
        this.deleteUserByIdUseCase = deleteUserByIdUseCase
    }

    async execute(request: any, reply: any): Promise<void> {
        try {
            const {id} = request.params

            const deleteUserById = await this.deleteUserByIdUseCase.execute(id)

            if (!deleteUserById) {
                return reply.status(404).send({message: "User not found"})
            }

            return reply.status(200).send({message: "User deleted successfully"})
        } catch (error) {
            console.error(error)
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}