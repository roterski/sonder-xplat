import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TagsStore, TagsState } from './tags.store';
import { Tag } from '../models';

@Injectable({ providedIn: 'root' })
export class TagsQuery extends QueryEntity<TagsState, Tag> {
  constructor(protected store: TagsStore) {
    super(store);
  }

  selectNewTags(): Observable<Tag[]> {
    return this.select(state => state.newPostTags);
  }
}
