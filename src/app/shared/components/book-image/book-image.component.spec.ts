import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookImageComponent } from './book-image.component';

describe('BookImageComponent', () => {
  let component: BookImageComponent;
  let fixture: ComponentFixture<BookImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookImageComponent]
    });
    fixture = TestBed.createComponent(BookImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
