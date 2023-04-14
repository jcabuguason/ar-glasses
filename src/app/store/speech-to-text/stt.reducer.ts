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
    const formattedMessage = `(${message.datetime}) ${message.message}`;
    console.log('in reducer');
    console.log(formattedMessage);
    return { ...state, messageLog: [...state.messageLog, formattedMessage] };
  }),
  on(clearLog, (state: any, message: any) => {
    return ttsState;
  })
);
