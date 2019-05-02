import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Post, Tag, TagsQuery } from '@sonder/features/posts';
import { Profile, ProfilesQuery } from '@sonder/features/profiles';
import { Observable } from 'rxjs';

@Component({
  selector: 'sonder-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() voted: number;
  @Output() tagClicked = new EventEmitter<Tag>();

  profile$: Observable<Profile>;
  tags$: Observable<Tag[]>;

  constructor(
    private profilesQuery: ProfilesQuery,
    private tagsQuery: TagsQuery
  ) {}

  ngOnInit() {
    this.profile$ = this.profilesQuery.selectEntity(this.post.profileId);
    this.tags$ = this.tagsQuery.selectMany(this.post.tags);
  }

  clickedTag(tag: Tag) {
    this.tagClicked.emit(tag);
  }

  upvote() {
    // if (this.voted > 0) {
    //   this.myVotesService
    //     .revokePostVote(this.post.id)
    //     .pipe(take(1))
    //     .subscribe();
    // } else {
    //   this.myVotesService
    //     .upvotePost(this.post.id)
    //     .pipe(take(1))
    //     .subscribe();
    // }
  }

  downvote() {
    // if (this.voted < 0) {
    //   this.myVotesService
    //     .revokePostVote(this.post.id)
    //     .pipe(take(1))
    //     .subscribe();
    // } else {
    //   this.myVotesService
    //     .downvotePost(this.post.id)
    //     .pipe(take(1))
    //     .subscribe();
    // }
  }
}
