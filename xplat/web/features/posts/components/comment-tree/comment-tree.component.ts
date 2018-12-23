import { Component, OnInit, Input } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
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

    zip(
      this.comments,
      commentEntities$,
    ).subscribe(([comments, entities]: [PostComment[], {number: PostComment}]) => {

      this.treeFlattener = new MatTreeFlattener(
        this.transformer,
        this.getNodeLevel,
        this.isNodeExpendable,
        this.getChildren(entities)
      );
      this.dataSource = new MatTreeFlatDataSource(
        this.treeControl,
        this.treeFlattener
      );

      this.dataSource.data = comments.map(({ id }) => entities[id])
              .filter((comment: PostComment) => comment.parentIds.length == 0)
              .map((comment: PostComment) => new CommentNode(comment));
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

  private getChildren(entities) {
    return (node: CommentNode) => {
      return node.comment.childrenIds.map((id: number) => new CommentNode(entities[id]));
    }
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
