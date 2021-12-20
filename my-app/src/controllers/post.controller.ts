import { Filter, repository } from "@loopback/repository";
import { get, post, requestBody, param, del, put } from "@loopback/rest";
import { Post } from "../models";
import { PostRepository } from "../repositories";

export class PostController {
  constructor(
    @repository(PostRepository) public postRepository: PostRepository
  ) {}
  @get("/post")
  async post(
    @param.query.object("filter") filter: Filter<Post> 
  ): Promise<Post[]> {
    return this.postRepository.find({
      include: ['user']
    });
  }
  @get("/post/{id}")
  async getById(@param.path.string("id") id: string) : Promise<Post>{
    return this.postRepository.findById(id);
  }
  @post("/post")
  async creat(@requestBody() user: Post): Promise<Post> {
    return this.postRepository.create(user);
  }

  @put("/post/{id}")
  async edit(
    @param.path.string("id") id: string,
    @requestBody() post: Post
  ): Promise<void> {
    await this.postRepository.replaceById(id, post);
  }

  @del("/post/{id}")
  async deleteById(@param.path.string("id") id: string): Promise<void> {
    await this.postRepository.deleteById(id);
  }
}
