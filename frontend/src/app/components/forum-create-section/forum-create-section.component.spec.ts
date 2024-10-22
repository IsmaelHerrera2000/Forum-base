import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCreateSectionComponent } from './forum-create-section.component';

describe('ForumCreateSectionComponent', () => {
  let component: ForumCreateSectionComponent;
  let fixture: ComponentFixture<ForumCreateSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumCreateSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumCreateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
