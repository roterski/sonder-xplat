import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  getInitialEntitiesState
} from '@datorama/akita';
import { Tag } from '../models';

export interface TagsState extends EntityState<Tag> {
  postFilterTags: number[];
}

const initialState = {
  postFilterTags: [],
  ...getInitialEntitiesState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tags' })
export class TagsStore extends EntityStore<TagsState, Tag> {
  constructor() {
    super(initialState);
  }
}
