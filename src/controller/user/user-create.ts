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
    // constructor(createUserUseCase: CreateUserUseCase){ 
    //     // this.createUserUseCase = createUserUseCase;     
    // }

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
    const createdUserInDatabase = await db.orm.public.User.create({
      id: body.id,
      email: body.email,
      firstName: body.first_name,
      lastName: body.last_name,
      password: body.password,
    })
    console.log("createdUserInDatabase", createdUserInDatabase)

    reply.status(201).send({
      message: "User created successfully",
      user: createdUserInDatabase,
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