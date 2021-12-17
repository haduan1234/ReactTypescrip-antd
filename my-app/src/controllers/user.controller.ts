import { repository } from "@loopback/repository";
import { get, post, requestBody, param, del, put } from "@loopback/rest";
import { User } from "../models";
import { UserRepository } from "../repositories";

export class HelloController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository
  ) {}
  @get("/hello")
  async hello(): Promise<User[]> {
    return this.userRepository.find();
  }
  @post("/hello")
  async creat(@requestBody() user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  @put("/hello/{id}")
  async edit(
    @param.path.string("id") id: string,
    @requestBody() use: User
  ): Promise<void> {
    await this.userRepository.replaceById(id, use);
  }

  @del("/hello/{id}")
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
