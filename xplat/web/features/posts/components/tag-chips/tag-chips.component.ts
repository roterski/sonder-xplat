import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent
} from '@angular/material';
import { Tag } from '@sonder/features/posts/models';

@Component({
  selector: 'sonder-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.scss']
})
export class TagChipsComponent implements OnInit {
  @Input() selectedTags: Observable<Tag[]>;
  @Input() tags: Observable<Tag[]>;
  @Input() allowNew = true;
  @Input() removable = true;

  @Output() added = new EventEmitter<Tag>();
  @Output() removed = new EventEmitter<Tag>();

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagCtrl = new FormControl();
  public suggestedTags$: Observable<Tag[]>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit() {
    const notSelectedTags$ = combineLatest(this.tags, this.selectedTags).pipe(
      map(([all, selected]) =>
        all.filter(tag => !selected.map(t => t.name).includes(tag.name))
      )
    );
    this.suggestedTags$ = combineLatest(
      this.tagCtrl.valueChanges,
      notSelectedTags$
    ).pipe(
      map(
        ([input, tags]) =>
          input
            ? tags.filter(tag =>
                tag.name.toLowerCase().startsWith(input.toLowerCase())
              )
            : tags
      )
    );
  }

  add(event: MatChipInputEvent): void {
    if (this.allowNew) {
      const tag: Tag = { id: null, name: event.value };
      this.added.emit(tag);
      event.input.value = '';
    }
  }

  remove(tag: Tag) {
    this.removed.emit(tag);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const tag: Tag = {
      id: parseInt(event.option.id, 10),
      name: event.option.value
    };
    this.added.emit(tag);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
}
