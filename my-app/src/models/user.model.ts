import { Entity, model, property, hasMany } from "@loopback/repository";
import { Post } from "./post.model";

@model({ settings: { strict: false } })
export class User extends Entity {
  @property({
    type: "string",
    id: true,
    generated: true
  })
  id?: string;

  @property({
    type: "string",
    required: true
  })
  name: string;

  @property({
    type: "number",
    required: true
  })
  age: string;

  @property({
    type: "string",
    required: true
  })
  address: string;

  // @hasMany(() => Post)
  // post?: Post[]

  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
