import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieComponent } from './pie.component';

describe('ProfilePieGraphsComponent', () => {
  let component: PieComponent;
  let fixture: ComponentFixture<PieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieComponent]
    });
    fixture = TestBed.createComponent(PieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
