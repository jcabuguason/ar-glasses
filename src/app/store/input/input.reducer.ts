
import { createReducer, on } from '@ngrx/store';
import { InputType } from 'src/app/noise-sensitivity/input.enum';
import { requestInputUpdate, updateInputSuccess } from './input.actions';
import { InputState } from './input.selectors';

export const inputState : InputState = {
  noiseSensitivity : 20,
  vibrationSensitivity: 20,
  fontSize : 10,
  displayBrightness: 10,
  classificationToggle: false,
  processingToggle: false,
}


export const inputReducer = createReducer(
  inputState,
  on(
    updateInputSuccess,
    (state: any, { inputID, inputValue }: any) => {

      switch(inputID){
        case InputType.NoiseSensitivity:
          return {...state,noiseSensitivity: inputValue}
        case InputType.VibrationSensitivity:
          return {...state,vibrationSensitivity: inputValue}
        case InputType.FontSize:
          return {...state,fontSize: inputValue}
        case InputType.DisplayBrightness:
          return {...state,displayBrightness: inputValue}
        case InputType.ClassificationToggle:
          return {...state,classificationToggle: inputValue}
        case InputType.ProcessingToggle:
          return {...state,processingToggle: inputValue}
      }

      return state;
    },
  )
);
