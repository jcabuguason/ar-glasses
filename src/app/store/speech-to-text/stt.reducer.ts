import { createReducer, on } from '@ngrx/store';
import { InputType } from 'src/app/noise-sensitivity/input.enum';
import { addMessageSuccess, clearLog } from './stt.actions';

export interface STTState {
  messageLog: [];
}

export const ttsState: STTState = {
  messageLog: [],
};

export const sttReducer = createReducer(
  ttsState,
  on(addMessageSuccess, (state: any, message: any) => {
    return { ...state, messageLog: [...state.messageLog, message] };
  }),
  on(clearLog, (state: any, message: any) => {
    return ttsState;
  })
);
