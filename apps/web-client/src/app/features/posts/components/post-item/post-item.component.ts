import { Component, Input, OnInit } from '@angular/core';
import { MyVotesService } from '../../state';
import { Post } from '../../models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() voted: number;

  constructor(
    private myVotesService: MyVotesService
  ) { }

  ngOnInit() {
  }

  upvote() {
    if (this.voted > 0) {
      this.myVotesService.revokePostVote(this.post.id).pipe(take(1)).subscribe();
    } else {
      this.myVotesService.upvotePost(this.post.id).pipe(take(1)).subscribe();
    }
  }

  downvote() {
    if (this.voted < 0) {
      this.myVotesService.revokePostVote(this.post.id).pipe(take(1)).subscribe();
    } else {
      this.myVotesService.downvotePost(this.post.id).pipe(take(1)).subscribe();
    }
  }
}
