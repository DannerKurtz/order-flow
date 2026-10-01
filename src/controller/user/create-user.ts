import { db } from "../../database/database.ts"


type CreateUserUseCase = {
    execute: (data: {
        id: string
        email: string
        first_name: string
        last_name: string
        password: string
    }) => Promise<any>
}

export class UserCreateController {
  private createUserUseCase: CreateUserUseCase
    constructor(createUserUseCase: CreateUserUseCase){ 
        this.createUserUseCase  = createUserUseCase;     
    }

    async execute(httpRequest: any, reply: any): Promise<void> {
        try {
    const body: {
      id: string
      email: string
      first_name: string
      last_name: string
      password: string
    } = httpRequest.body as {
      id: string
      email: string
      first_name: string
      last_name: string
      password: string
    }
    console.log("body", body)
    
    const createdUser = await this.createUserUseCase.execute(body)
    reply.status(201).send({
      message: "User created successfully",
      user: createdUser
    })
  } catch (error) {
    console.error("Error creating user:", error)
    reply.status(500).send({
      message: "Error creating user",
      error: error instanceof Error ? error.message : String(error),
    })
  }
    }
}