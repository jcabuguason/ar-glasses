import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  AppState,
  selectClassificationToggle,
  selectClassificationValue,
  selectDisplayBrightness,
  selectFontSize,
  selectNoiseSensitivity,
  selectProcessingToggle,
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
  public classificationValue: string = "N/A";

  constructor(private store: Store<AppState>) {

    this.inputGroup = new FormGroup({
      noiseSensitivity: new FormControl(0),
      vibrationSensitivity: new FormControl(0),
      fontSize: new FormControl(0),
      displayBrightness: new FormControl(0),
      processingToggle: new FormControl(false),
      classificationToggle: new FormControl(false)
   });



   this.inputGroup.controls['vibrationSensitivity'].disable()
   this.inputGroup.controls['fontSize'].disable()
  }

  ngOnInit() {
    this.store.pipe(select(selectNoiseSensitivity)).subscribe((value) => {
      this.inputGroup.controls['noiseSensitivity'].setValue(value)
    });

    this.store.pipe(select(selectVibrationSensitivity)).subscribe((value) => {
      this.inputGroup.controls['vibrationSensitivity'].setValue(value)
    });

    this.store.pipe(select(selectFontSize)).subscribe((value) => {
      this.inputGroup.controls['fontSize'].setValue(value)
    });

    this.store.pipe(select(selectDisplayBrightness)).subscribe((value) => {
      this.inputGroup.controls['displayBrightness'].setValue(value)
    });

    this.store.pipe(select(selectProcessingToggle)).subscribe((value) => {
      this.inputGroup.controls['processingToggle'].setValue(value)
    });

    this.store.pipe(select(selectClassificationToggle)).subscribe((value) => {
      this.inputGroup.controls['classificationToggle'].setValue(value)
    });

    this.store.pipe(select(selectClassificationValue)).subscribe((value) => {
      this.classificationValue = value;
    });

    this.inputGroup.controls["classificationToggle"].valueChanges.subscribe((value)=>{
      this.updateInputValue(4,value);
    });

    this.inputGroup.controls["processingToggle"].valueChanges.subscribe((value)=>{
      this.updateInputValue(5,value);
    });
  }

  updateInputValue(inputType: InputType, value: number){

    this.store.dispatch(requestInputUpdate({
      inputID: inputType,
      inputValue: value
    }))
  }
}
