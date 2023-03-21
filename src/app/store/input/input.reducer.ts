
import { createReducer, on } from '@ngrx/store';
import { InputType } from 'src/app/noise-sensitivity/input.enum';
import { requestInputUpdate } from './input.actions';
import { InputState } from './input.selectors';

export const inputState : InputState = {
  noiseSensitivity : 20,
  vibrationSensitivity: 20,
  fontSize : 10,
}


export const inputReducer = createReducer(
  inputState,
  on(
    requestInputUpdate,
    (state: any, { inputID, inputValue }: any) => {

      switch(inputID){
        case InputType.NoiseSensitivity:
          return {...state,noiseSensitivity: inputValue}
        case InputType.VibrationSensitivity:
          return {...state,vibrationSensitivity: inputValue}
        case InputType.FontSize:
          return {...state,fontSize: inputValue}
      }

      return state;
    },
  )
);
