import { State, Action, Selector, StateContext } from '@ngxs/store';
import { EntityState, EntityStateModel, defaultEntityState, IdStrategy } from 'entity-state/src';
import { Post } from '../models/post.model';

@State<EntityStateModel<Post>>({
  name: 'posts',
  defaults: defaultEntityState()
})
export class PostsState extends EntityState<Post> {
  constructor() {
    super(PostsState, 'id', IdStrategy.EntityIdGenerator);
  }

  onUpdate(current: Readonly<Post>, updated: Partial<Post>) {
    return { ...current, ...updated };
  }
}
