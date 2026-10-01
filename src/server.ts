import fastify from "fastify"
import "temporal-polyfill/global"
import { db } from "./database/database.ts"
import { controller } from "./controller/index.ts"
import { useCase } from "./use case/index.ts"
import { repository } from "./repository/index.ts"

const server = fastify()

server.get("/ping", async (request, reply) => {
  return "pong\n"
})

server.post("/api/user", async (request, reply) => {
  const userCreateRepository = new repository.userRepository.userCreateRepository()
  const createUserUseCase = new useCase.userUseCase.userCreateUserCase(userCreateRepository)
  const createUserController = new controller.user.UserCreateController(createUserUseCase)
  await createUserController.execute(request, reply)
})

server.listen({ port: 4008 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
