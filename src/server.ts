import fastify from "fastify"
import "temporal-polyfill/global"
import { controller } from "./controller/index.ts"
import { useCase } from "./use case/index.ts"
import { repository } from "./repository/index.ts"

interface UserQuery{
  id: string,
  email: string
}

const server = fastify()

server.get("/ping", async (request, reply) => {
  return "pong\n"
})

server.post("/api/user", async (request, reply) => {
  const userCreateRepository = new repository.userRepository.userCreateRepository()
  const getUserByEmailRepository = new repository.userRepository.getUserByEmailRepository()
  const createUserUseCase = new useCase.userUseCase.userCreateUserCase(userCreateRepository, getUserByEmailRepository)
  const createUserController = new controller.user.userCreateController(createUserUseCase)
  await createUserController.execute(request, reply)
})

server.get<{Querystring: UserQuery}>("/api/user", async (request, reply) => {
  const getUserByIdRepository = new repository.userRepository.getUserByIdRepository()
  const getUserByEmailRepository = new repository.userRepository.getUserByEmailRepository()
  const getUserUseCase = new useCase.userUseCase.getUserUseCase(getUserByIdRepository, getUserByEmailRepository)
  const getUserController = new controller.user.getUserController(getUserUseCase)
  await getUserController.execute(request, reply)
})

server.patch("/api/user/:id", async (request, reply) => {
  const getUserByEmailRepository = new repository.userRepository.getUserByEmailRepository()
  const updateUserByIdRepository = new repository.userRepository.updateUserByIdRepository()
  const updateUserUseCase = new useCase.userUseCase.updateUserUseCase(getUserByEmailRepository, updateUserByIdRepository)
  const updateUserController = new controller.user.updateUserController(updateUserUseCase)
  await updateUserController.execute(request, reply)
})

server.delete("/api/user/:id", async (request, reply) => {
  const getUserByIdRepository = new repository.userRepository.getUserByIdRepository()
  const updateUserByIdRepository = new repository.userRepository.updateUserByIdRepository()
  const deleteUserByIdUseCase = new useCase.userUseCase.deleteUserByIdUseCase(getUserByIdRepository, updateUserByIdRepository)
  const deleteUserByIdController = new controller.user.deleteUserByIdController(deleteUserByIdUseCase)
  await deleteUserByIdController.execute(request, reply)
})
server.listen({ port: 4008 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
