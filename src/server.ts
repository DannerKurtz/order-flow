import fastify from "fastify"
import "temporal-polyfill/global"
import { db } from "./database/database.ts"

const server = fastify()

server.get("/ping", async (request, reply) => {
  return "pong\n"
})

server.post("/api/user", async (request, reply) => {
  try {
    const body: {
      id: string
      email: string
      first_name: string
      last_name: string
      password: string
    } = request.body as {
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
      first_name: body.first_name,
      last_name: body.last_name,
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
})

server.listen({ port: 4008 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
