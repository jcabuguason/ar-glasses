import { Component } from '@angular/core';

@Component({
  selector: 'app-noise-sensitivity',
  templateUrl: './vibration-sensitivity.component.html',
  styleUrls: ['./vibration-sensitivity.component.scss']
})
export class VibrationSensitivityComponent {
  public noiseSensitivity : any;

  constructor(){
    this.noiseSensitivity = 0;
  }
}
