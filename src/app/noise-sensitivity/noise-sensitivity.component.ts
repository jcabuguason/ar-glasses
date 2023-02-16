import { Component } from '@angular/core';

@Component({
  selector: 'app-noise-sensitivity',
  templateUrl: './noise-sensitivity.component.html',
  styleUrls: ['./noise-sensitivity.component.scss']
})
export class NoiseSensitivityComponent {
  public noiseSensitivity : any;
  public vibrationSensitivity: any;
  public fontSize : any;

  constructor(){
    this.noiseSensitivity = 0;
    this.vibrationSensitivity = 50;
    this.fontSize = 20;
  }
}
