import {Getter, inject} from '@loopback/core';
import { 
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
  juggler
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Post, PostRelations, User} from '../models';
import { UserRepository } from '.';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id,
  PostRelations
> {
  public readonly user: BelongsToAccessor< User, typeof User.prototype.id>;
  constructor(
    @inject('datasources.db')  protected db: juggler.DataSource,
    @repository.getter('UserRepository') public userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Post, db);
    //tajo 
    this.user = this.createBelongsToAccessorFor(
      'user',
      this.userRepositoryGetter,
    );
      //
    this.registerInclusionResolver('user', this.user.inclusionResolver);

  }
}
