import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  AppState,
  selectFontSize,
  selectNoiseSensitivity,
  selectVibrationSensitivity,
} from '../store/app.state';
import { requestInputUpdate } from '../store/input/input.actions';
import { InputType } from './input.enum';

@Component({
  selector: 'app-noise-sensitivity',
  templateUrl: './noise-sensitivity.component.html',
  styleUrls: ['./noise-sensitivity.component.scss'],
})
export class NoiseSensitivityComponent implements OnInit {
  public inputGroup : FormGroup;

  constructor(private store: Store<AppState>) {

    this.inputGroup = new FormGroup({
      noiseSensitivity: new FormControl(0),
      vibrationSensitivity: new FormControl(0),
      fontSize: new FormControl(0),
   });
  }

  ngOnInit() {
    // subscribe to noise sentivity updates
    this.store.pipe(select(selectNoiseSensitivity)).subscribe((value) => {
      console.log('hello');
      console.log(value);
    });

    //
    this.store.pipe(select(selectVibrationSensitivity)).subscribe((value) => {
      this.inputGroup.controls['noiseSensitivity'].setValue(value)
    });

    // Subscribe to the
    this.store.pipe(select(selectFontSize)).subscribe((value) => {
      console.log('hello');
      console.log(value);
    });
  }

  updateInputValue(inputType: InputType, value: number){

    this.store.dispatch(requestInputUpdate({
      inputID: inputType,
      inputValue: value
    }))
  }
}
