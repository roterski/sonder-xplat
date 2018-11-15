import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vote-buttons',
  templateUrl: './vote-buttons.component.html',
  styleUrls: ['./vote-buttons.component.scss']
})
export class VoteButtonsComponent implements OnInit {
  @Input() points: number;
  @Input() voted: number;
  @Output() upvoted = new EventEmitter();
  @Output() downvoted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
