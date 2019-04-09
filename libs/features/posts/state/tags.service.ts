import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Tag } from '../models';
import { TagsApiService } from '../services/tags-api.service';
import { TagsStore, TagsState } from './tags.store';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class TagsService {
  constructor(
    private tagsStore: TagsStore,
    private tagsApiService: TagsApiService,
    private formsManager: AkitaNgFormsManager<any>
  ) {}

  loadTags() {
    return this.tagsApiService.getTags().pipe(
      pluck('data'),
      tap((tags: Tag[]) => this.tagsStore.set(tags))
    );
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
