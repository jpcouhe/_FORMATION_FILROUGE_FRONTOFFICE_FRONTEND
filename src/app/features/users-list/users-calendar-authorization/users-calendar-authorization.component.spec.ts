import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCalendarAuthorizationComponent } from './users-calendar-authorization.component';

describe('UsersCalendarAuthorizationComponent', () => {
  let component: UsersCalendarAuthorizationComponent;
  let fixture: ComponentFixture<UsersCalendarAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCalendarAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCalendarAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
