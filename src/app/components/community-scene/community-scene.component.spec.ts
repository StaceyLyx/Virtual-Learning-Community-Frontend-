import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySceneComponent } from './community-scene.component';

describe('CommunitySceneComponent', () => {
  let component: CommunitySceneComponent;
  let fixture: ComponentFixture<CommunitySceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitySceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
