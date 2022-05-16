import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTaskComponent } from './person-task.component';

describe('PersonTaskComponent', () => {
  let component: PersonTaskComponent;
  let fixture: ComponentFixture<PersonTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
