import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiseSensitivityComponent } from './noise-sensitivity.component';

describe('NoiseSensitivityComponent', () => {
  let component: NoiseSensitivityComponent;
  let fixture: ComponentFixture<NoiseSensitivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoiseSensitivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoiseSensitivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
