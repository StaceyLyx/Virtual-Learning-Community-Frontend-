import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFinishedComponent } from './check-finished.component';

describe('CheckFinishedComponent', () => {
  let component: CheckFinishedComponent;
  let fixture: ComponentFixture<CheckFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
