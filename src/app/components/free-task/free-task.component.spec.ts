import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTaskComponent } from './free-task.component';

describe('FreeTaskComponent', () => {
  let component: FreeTaskComponent;
  let fixture: ComponentFixture<FreeTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
