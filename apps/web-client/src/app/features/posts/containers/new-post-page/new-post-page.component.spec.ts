import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostPageComponent } from './new-post-page.component';

describe('NewPostPageComponent', () => {
  let component: NewPostPageComponent;
  let fixture: ComponentFixture<NewPostPageComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ NewPostPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostPageComponent);
    component = fixture.componentInstance;
    // store = TestBed.get(Store);

    // spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
