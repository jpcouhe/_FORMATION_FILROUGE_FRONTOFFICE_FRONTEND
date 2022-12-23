import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuthorizationComponent } from './manage-authorization.component';

describe('ManageAuthorizationComponent', () => {
  let component: ManageAuthorizationComponent;
  let fixture: ComponentFixture<ManageAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
