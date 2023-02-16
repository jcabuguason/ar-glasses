import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VibrationSensitivityComponent } from './vibration-sensitivity.component';

describe('VibrationSensitivityComponent', () => {
  let component: VibrationSensitivityComponent;
  let fixture: ComponentFixture<VibrationSensitivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VibrationSensitivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VibrationSensitivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
