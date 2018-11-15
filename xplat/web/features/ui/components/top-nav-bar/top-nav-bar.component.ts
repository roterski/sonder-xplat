import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Output() logOut = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
