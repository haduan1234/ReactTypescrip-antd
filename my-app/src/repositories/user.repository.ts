import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Post, User, UserRelations} from '../models';
import { PostRepository } from './post.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.name,
  UserRelations
> {
//   public readonly post: HasManyRepositoryFactory<
//   Post,
//   typeof User.prototype.id
// >;
  constructor(
    @inject('datasources.db') protected db: juggler.DataSource,
    // @repository.getter('PostRepository')
    // postRepositoryGetter: Getter<PostRepository>,
  ) {
    super(User, db);
    // this.post = this.createHasManyRepositoryFactoryFor(
    //   'post',
    //   postRepositoryGetter,
    // );
  }
}
