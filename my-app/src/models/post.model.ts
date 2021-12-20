import { Entity, model, property, belongsTo } from "@loopback/repository";
import { UserRelations, UserWithRelations } from ".";
import { User } from ".";

@model({ settings: { strict: false } })
export class Post extends Entity {
  @property({
    type: "string",
    id: true,
    generated: true
  })
  id?: string;

  @property({
    type: "string"
  })
  namePost?: string;

  @property({
    type: "string"
  })
  content?: string;

  @belongsTo(() => User)
  userId: string;

  [prop: string]: any;

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
  user?: UserWithRelations
}

export type PostWithRelations = Post & PostRelations;
