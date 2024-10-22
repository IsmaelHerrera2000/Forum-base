import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostsComponent } from './forum-posts.component';

describe('ForumPostsComponent', () => {
  let component: ForumPostsComponent;
  let fixture: ComponentFixture<ForumPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
