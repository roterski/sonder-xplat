import { Injectable } from '@angular/core';
import { ID, noop } from '@datorama/akita';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../models/tag.model';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { TagsStore } from './tags.store';
import { TagsQuery } from './tags.query';
import { HttpClient } from '@angular/common/http';
import { TagsApiService } from '../services';

@Injectable({ providedIn: 'root' })
export class TagsService {

  constructor(
    private tagsStore: TagsStore,
    private tagsApi: TagsApiService,
    private tagsQuery: TagsQuery,
    private route: ActivatedRoute) {
  }

  getTags(): Observable<Tag[]> {
    const request = this.tagsApi
      .getTags()
      .pipe(
        map(response => response.data),
        tap((tags: Tag[]) => this.tagsStore.set(tags))
      );

    return this.tagsQuery.loaded$.pipe(
      switchMap((loaded: boolean) => {
        return loaded ? this.tagsQuery.selectAll() : request;
      })
    );
  }

  addNewPostTag(tag: Tag) {
    this.tagsStore.addNewPostTag(tag);
  }

  removeNewPostTag(tag: Tag) {
    this.tagsStore.removeNewPostTag(tag);
  }

  addPostFilterTag(tag: Tag) {
    this.tagsStore.addPostFilterTag(tag);
  }

  removePostFilterTag(tag: Tag) {
    this.tagsStore.removePostFilterTag(tag);
  }

  clearNewPostTags() {
    this.tagsStore.clearNewPostTags();
  }
}
