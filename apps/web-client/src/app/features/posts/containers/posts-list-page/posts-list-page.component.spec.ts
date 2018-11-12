import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListPageComponent } from './posts-list-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('PostsListPageComponent', () => {
  let component: PostsListPageComponent;
  let fixture: ComponentFixture<PostsListPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ PostsListPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
