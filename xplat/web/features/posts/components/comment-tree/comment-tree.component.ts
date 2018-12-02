import { Component, OnInit, Input } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HashMap } from '@datorama/akita';
import { Post, PostComment } from '@sonder/features/posts/models';
import { Observable, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export class CommentNode {
  constructor(public comment: PostComment) {}
}

export class CommentFlatNode {
  constructor(
    public expandable: boolean,
    public comment: PostComment,
    public level: number
  ) {}
}

@Component({
  selector: 'sonder-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit {
  @Input() votes;
  @Input() comments: Observable<PostComment[]>;

  dataSource: MatTreeFlatDataSource<CommentNode, CommentFlatNode>;
  treeFlattener: MatTreeFlattener<CommentNode, CommentFlatNode>;
  treeControl: FlatTreeControl<CommentFlatNode>;

  constructor() {}

  ngOnInit() {
    this.treeControl = new FlatTreeControl<CommentFlatNode>(
      this.getNodeLevel,
      this.isNodeExpendable
    );

    const commentEntities$ = this.comments.pipe(
      map(comments => this.appendChildrenIds(comments))
    );

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getNodeLevel,
      this.isNodeExpendable,
      this.getChildren(commentEntities$)
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    zip(
      commentEntities$,
      this.comments
    ).pipe(
      map(([entities, comments]) => comments.map(({ id }) => entities[id])),
      map((comments: PostComment[]) => comments.map(comment => new CommentNode(comment)))
    ).subscribe((nodes) => {
      this.dataSource.data = nodes;
      this.treeControl.expandAll();
    });
  }

  private transformer(node: CommentNode, level: number) {
    return new CommentFlatNode(
      node.comment.childrenIds.length > 0,
      node.comment,
      level
    );
  }

  private getChildren(entities$) {
    return (node: CommentNode) => {
      return entities$.pipe(
        map(entities => node.comment.childrenIds.map(id => new CommentNode(entities[id])))
      );
    };
  }

  private getNodeLevel(node: CommentFlatNode) {
    return node.comment.parentIds.length;
  }

  private isNodeExpendable(node: CommentFlatNode) {
    return node.expandable;
  }

  private appendChildrenIds(comments) {
    return comments.reduce((acc, comment) => {
      acc[comment.id] = comment;
      acc[comment.id].childrenIds = comment.childrenIds || [];
      const parentId = comment.parentIds.slice(-1)[0];
      if (parentId) {
        acc[parentId].childrenIds = Array.from(
          new Set([
            ...acc[parentId].childrenIds,
            comment.id,
          ])
        );
      }
      return acc;
    }, {});
  }
}
