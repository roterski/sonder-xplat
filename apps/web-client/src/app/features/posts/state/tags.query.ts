import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TagsStore, TagsState } from './tags.store';
import { Tag } from '../models/tag.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TagsQuery extends QueryEntity<TagsState, Tag> {
  tags$ = this.select((state: TagsState) => state.entities);
  loaded$ = this.select((state: TagsState) => state.loaded);
  newPostTags$ = this.select((state: TagsState) => state.newPostTags);

  constructor(protected store: TagsStore) {
    super(store);
  }

  getPostFilterTags(): Observable<Tag[]> {
    return this.select((state: TagsState) => {
      return state.postFilterTags.map((tagId) => state.entities[tagId]);
    });
  }
}
