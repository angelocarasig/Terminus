import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatsGraphsComponent } from './profile-stats-graphs.component';

describe('ProfileStatsGraphsComponent', () => {
  let component: ProfileStatsGraphsComponent;
  let fixture: ComponentFixture<ProfileStatsGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileStatsGraphsComponent]
    });
    fixture = TestBed.createComponent(ProfileStatsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
