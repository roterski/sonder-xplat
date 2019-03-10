import { Component, OnInit } from '@angular/core';
import {
  PostsBaseComponent,
  Post,
  PostsQuery,
  PostsService,
  ProfilesQuery,
} from '@sonder/features';
import { ProfilesService } from '@sonder/features/profiles/services';
import { Observable, of } from 'rxjs';
import { takeUntil, tap, pluck, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html'
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
    // this.profiles$ = this.profilesQuery.sele
    this.loading$ = this.postsQuery.selectLoading();
    this.postsService
      .loadPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.posts$.pipe(
      map(posts => posts.map(post => post.profileId)),
      switchMap((ids: number[]) => this.profilesService.loadProfiles(ids)),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
