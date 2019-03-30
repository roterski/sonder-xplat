import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Tag } from '../models';
import { TagsApiService } from '../services/tags-api.service';
import { TagsStore, TagsState } from './tags.store';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class TagsService {
  constructor(
    private tagsStore: TagsStore,
    private tagsApiService: TagsApiService
  ) {}

  loadTags() {
    return this.tagsApiService.getTags().pipe(
      pluck('data'),
      tap((tags: Tag[]) => this.tagsStore.set(tags))
    );
  }

  addNewPostTag(tag: Tag) {
    return this.tagsStore.update((state: TagsState) => ({
      ...state,
      newPostTags: _.uniq([...state.newPostTags, tag])
    }));
  }

  removeNewPostTag(tag: Tag) {
    return this.tagsStore.update((state: TagsState) => ({
      ...state,
      newPostTags: _.reject(state.newPostTags, id => id === tag.id)
    }));
  }
}
