import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShowPageComponent } from './post-show-page.component';

describe('PostShowPageComponent', () => {
  let component: PostShowPageComponent;
  let fixture: ComponentFixture<PostShowPageComponent>;
  // let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ PostShowPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostShowPageComponent);
    component = fixture.componentInstance;
    // store = TestBed.get(Store);

    // spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
