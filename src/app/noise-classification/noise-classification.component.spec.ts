import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiseClassificationComponent } from './noise-classification.component';

describe('NoiseClassificationComponent', () => {
  let component: NoiseClassificationComponent;
  let fixture: ComponentFixture<NoiseClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoiseClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoiseClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
