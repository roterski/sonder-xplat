import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, tap, map, switchMap } from 'rxjs/operators';
import { Tag, Post } from '../models';
import { TagsApiService } from '../services/tags-api.service';
import { TagsStore, TagsState } from './tags.store';
import { TagsQuery } from './tags.query';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class TagsService {
  constructor(
    private tagsStore: TagsStore,
    private tagsQuery: TagsQuery,
    private tagsApiService: TagsApiService,
    private formsManager: AkitaNgFormsManager<any>
  ) {}

  loadTags() {
    return this.tagsApiService.getTags().pipe(
      pluck('data'),
      tap((tags: Tag[]) => this.tagsStore.set(tags))
    );
  }

  addTags(newTags: Tag[]) {
    return this.tagsStore.add(_.uniqBy(newTags, ({ id }) => id));
  }

  addPostFilterTag({ id }: Tag) {
    return this.tagsStore.update((state: TagsState) => ({
      ...state,
      postFilterTags: _.uniq([...state.postFilterTags, id])
    }));
  }

  setPostFilterTags(tagNames: string[]) {
    return this.tagsQuery.selectAll({
      filterBy: ({ name }: Tag) => tagNames.includes(name)
    }).pipe(
      map((tags: Tag[]) => tags.map(({id}) => id)),
      tap((ids: number[]) => this.tagsStore.update((state: TagsState) => ({
        ...state,
        postFilterTags: _.uniq(ids)
      })))
    );
  }

  removePostFilterTag(tag: Tag) {
    return this.tagsStore.update((state: TagsState) => ({
      ...state,
      postFilterTags: state.postFilterTags.filter(id => tag.id !== id)
    }));
  }

  addNewPostTag(tag: Tag) {
    return this.formsManager.store.update(state => ({
      ...state,
      newPost: {
        ...state.newPost,
        value: {
          ...state.newPost.value,
          tags: [...state.newPost.value.tags, tag]
        }
      }
    }));
  }

  removeNewPostTag(tag: Tag) {
    return this.formsManager.store.update(state => ({
      ...state,
      newPost: {
        ...state.newPost,
        value: {
          ...state.newPost.value,
          tags: state.newPost.value.tags.filter(
            ({ id, name }) => (!id || id !== tag.id) && name !== tag.name
          )
        }
      }
    }));
  }
}
