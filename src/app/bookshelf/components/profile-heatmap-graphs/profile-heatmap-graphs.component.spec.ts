import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeatmapGraphsComponent } from './profile-heatmap-graphs.component';

describe('ProfileHeatmapGraphsComponent', () => {
  let component: ProfileHeatmapGraphsComponent;
  let fixture: ComponentFixture<ProfileHeatmapGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileHeatmapGraphsComponent]
    });
    fixture = TestBed.createComponent(ProfileHeatmapGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
