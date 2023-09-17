import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePieGraphsComponent } from './profile-pie-graphs.component';

describe('ProfilePieGraphsComponent', () => {
  let component: ProfilePieGraphsComponent;
  let fixture: ComponentFixture<ProfilePieGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePieGraphsComponent]
    });
    fixture = TestBed.createComponent(ProfilePieGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
