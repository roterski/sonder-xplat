import { Component, OnInit } from '@angular/core';
import {
  PostsBaseComponent,
  Post,
  PostsQuery,
  PostsService,
  ProfilesQuery,
  PostsState,
} from '@sonder/features';
import { ProfilesService } from '@sonder/features/profiles/services';
import { Observable, of } from 'rxjs';
import { takeUntil, tap, pluck, map, switchMap, filter } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.scss']
})
export class PostsListPageComponent extends PostsBaseComponent
  implements OnInit {
  posts$: Observable<Post[]>;
  profiles$: Observable<any>;
  loading$ = of(true);

  constructor(
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    private profilesQuery: ProfilesQuery,
    private profilesService: ProfilesService,
  ) {
    super();
  }

  ngOnInit() {
    this.posts$ = this.postsQuery.selectAll();
    this.loading$ = this.postsQuery.selectLoading();
    this.postsService
      .loadPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.posts$.pipe(
      filter((posts: Post[]) => posts.length > 0),
      map((posts: Post[]) => posts.map(post => post.profileId)),
      map((ids: number[]) => _.uniq(ids)),
      switchMap((ids: number[]) => this.profilesService.loadProfiles(ids)),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
