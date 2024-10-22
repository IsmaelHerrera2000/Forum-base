import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSectionsComponent } from './forum-sections.component';

describe('ForumSectionsComponent', () => {
  let component: ForumSectionsComponent;
  let fixture: ComponentFixture<ForumSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
