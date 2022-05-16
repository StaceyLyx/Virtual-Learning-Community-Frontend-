import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSideComponent } from './personal-side.component';

describe('PersonalSideComponent', () => {
  let component: PersonalSideComponent;
  let fixture: ComponentFixture<PersonalSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
