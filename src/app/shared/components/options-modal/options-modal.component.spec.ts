import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsModalComponent } from './options-modal.component';

describe('OptionsModalComponent', () => {
  let component: OptionsModalComponent;
  let fixture: ComponentFixture<OptionsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsModalComponent]
    });
    fixture = TestBed.createComponent(OptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
