import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonImageComponent } from './person-image.component';

describe('PersonImageComponent', () => {
  let component: PersonImageComponent;
  let fixture: ComponentFixture<PersonImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
