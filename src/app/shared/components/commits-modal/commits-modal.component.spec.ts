import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsModalComponent } from './commits-modal.component';

describe('CommitsModalComponent', () => {
  let component: CommitsModalComponent;
  let fixture: ComponentFixture<CommitsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommitsModalComponent]
    });
    fixture = TestBed.createComponent(CommitsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
