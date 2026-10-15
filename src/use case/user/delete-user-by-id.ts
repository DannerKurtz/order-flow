import bcrypt from "bcrypt"


export class DeleteUserByIdUseCase {
    private getUserByIdRepository: any
    private updateUserByIdRepository: any

    constructor(getUserByIdRepository: any, updateUserByIdRepository: any) {
        this.getUserByIdRepository = getUserByIdRepository
        this.updateUserByIdRepository = updateUserByIdRepository
    }

    async execute(id: string): Promise<boolean> {
        const getUserById = this.getUserByIdRepository.execute(id)

        if (!getUserById) {
            throw new Error("User not found")
        }
        const newPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const deleteUserSchema = {
            firstName: "user",
            lastName: "deleted",
            email: `${id}@deleted.com`,
            password: hashedPassword,
            isActive: false
        }
        
        const deletedUser = await this.updateUserByIdRepository.execute(id, deleteUserSchema)

        if (!deletedUser) {
            throw new Error("User not found")
        }
        return true
    }
}