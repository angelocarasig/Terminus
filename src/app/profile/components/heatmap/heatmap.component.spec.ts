import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapComponent } from './heatmap.component';

describe('ProfileHeatmapGraphsComponent', () => {
  let component: HeatmapComponent;
  let fixture: ComponentFixture<HeatmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatmapComponent]
    });
    fixture = TestBed.createComponent(HeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
