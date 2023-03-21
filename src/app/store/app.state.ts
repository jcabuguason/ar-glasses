import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConnectionState } from './connection/connection.reducer';
import { InputState } from './input/input.selectors';

export interface AppState {
  input: InputState;
  connection: ConnectionState;
}

export const selectInputFeature = (state: AppState) => state.input;
export const selectConnectionFeature = (state: AppState) => state.connection;

export const selectInputState = createSelector(
  selectInputFeature,
  (inputState: InputState) => inputState
);

export const selectConnectionState = createSelector(
  selectConnectionFeature,
  (connectionState: ConnectionState) => connectionState
);

export const selectNoiseSensitivity = createSelector(
  selectInputFeature,
  (state: InputState) => state.noiseSensitivity
);

export const selectVibrationSensitivity = createSelector(
  selectInputFeature,
  (state: InputState) => state.noiseSensitivity
);

export const selectFontSize = createSelector(
  selectInputFeature,
  (state: InputState) => state.noiseSensitivity
);
