import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNovelContainerComponent } from './profile-novel-container.component';

describe('ProfileRecentComponent', () => {
  let component: ProfileNovelContainerComponent;
  let fixture: ComponentFixture<ProfileNovelContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileNovelContainerComponent]
    });
    fixture = TestBed.createComponent(ProfileNovelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
