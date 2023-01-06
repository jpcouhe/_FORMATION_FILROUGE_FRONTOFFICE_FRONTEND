import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdPlanningComponent } from './form-upd-planning.component';

describe('FormUpdPlanningComponent', () => {
  let component: FormUpdPlanningComponent;
  let fixture: ComponentFixture<FormUpdPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
