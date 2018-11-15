import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState, ID } from '@datorama/akita';
import { Tag } from '../models/tag.model';

export interface TagsState extends EntityState<Tag> {
  loaded: boolean;
  newPostTags: Tag[];
  postFilterTags: ID[];
}

const initialState = {
  loaded: false,
  newPostTags: [],
  postFilterTags: [],
  ...getInitialActiveState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tags' })
export class TagsStore extends EntityStore<TagsState, Tag> {

  constructor() {
    super(initialState);
  }

  addNewPostTag(tag: Tag) {
    this.setState((state: TagsState) => {
      return {
        ...state,
        newPostTags: [...state.newPostTags, tag]
      };
    });
  }

  removeNewPostTag(tag: Tag) {
    this.setState((state: TagsState) => {
      const leftTags = state.newPostTags.filter((t) => t !== tag);

      return {
        ...state,
        newPostTags: leftTags
      };
    });
  }

  addPostFilterTag(tag: Tag) {
    this.setState((state: TagsState) => {
      const tagIds = Array.from(new Set([...state.postFilterTags, tag.id])); // unique values

      return {
        ...state,
        postFilterTags: tagIds
      };
    });
  }

  removePostFilterTag(tag: Tag) {
    this.setState((state: TagsState) => {
      const leftTags = state.postFilterTags.filter((tagId) => tagId !== tag.id);

      return {
        ...state,
        postFilterTags: leftTags
      };
    });
  }

  clearNewPostTags() {
    this.setState((state: TagsState) => {
      return {
        ...state,
        newPostTags: []
      };
    });
  }
}

