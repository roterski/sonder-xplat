import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PostComment } from '@sonder/features/posts/models';
import { take } from 'rxjs/operators';
import { NewCommentFormComponent } from '../../containers';
import { MatBottomSheet } from '@angular/material';
import { Observable } from 'rxjs';
import { ProfilesQuery, Profile } from '@sonder/features/profiles';

@Component({
  selector: 'sonder-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: PostComment;
  @Input() expanded: boolean;
  @Input() expandable: boolean;
  @Input() voted: number;
  profile$: Observable<Profile>;

  constructor(
    private newCommentBottomSheet: MatBottomSheet,
    private profilesQuery: ProfilesQuery
  ) {}

  ngOnInit() {
    this.profile$ = this.profilesQuery.selectEntity(this.comment.profileId);
  }

  upvote() {
    // if (this.voted > 0) {
    //   this.myVotesService
    //     .revokeCommentVote(this.comment.id)
    //     .pipe(take(1))
    //     .subscribe();
    // } else {
    //   this.myVotesService
    //     .upvoteComment(this.comment.id)
    //     .pipe(take(1))
    //     .subscribe();
    // }
  }

  downvote() {
    // if (this.voted < 0) {
    //   this.myVotesService
    //     .revokeCommentVote(this.comment.id)
    //     .pipe(take(1))
    //     .subscribe();
    // } else {
    //   this.myVotesService
    //     .downvoteComment(this.comment.id)
    //     .pipe(take(1))
    //     .subscribe();
    // }
  }

  openNewCommentBottomSheet() {
    this.newCommentBottomSheet.open(NewCommentFormComponent, {
      data: {
        postId: this.comment.postId,
        parentIds: [...this.comment.parentIds, this.comment.id]
      }
    });
  }
}
