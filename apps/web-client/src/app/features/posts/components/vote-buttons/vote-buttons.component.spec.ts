import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteButtonsComponent } from './vote-buttons.component';

describe('VoteButtonsComponent', () => {
  let component: VoteButtonsComponent;
  let fixture: ComponentFixture<VoteButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
