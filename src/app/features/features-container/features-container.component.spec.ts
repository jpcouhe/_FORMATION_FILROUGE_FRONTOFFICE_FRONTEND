import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesContainerComponent } from './features-container.component';

describe('FeaturesContainerComponent', () => {
  let component: FeaturesContainerComponent;
  let fixture: ComponentFixture<FeaturesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
