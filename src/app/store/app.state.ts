import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConnectionState } from './connection/connection.reducer';
import { InputState } from './input/input.selectors';
import { STTState } from './speech-to-text/stt.reducer';

export interface AppState {
  input: InputState;
  connection: ConnectionState;
  stt: STTState;
}

export const selectInputFeature = (state: AppState) => state.input;
export const selectConnectionFeature = (state: AppState) => state.connection;
export const selectSTTFeature = (state: AppState) => state.stt;

export const selectInputState = createSelector(
  selectInputFeature,
  (inputState: InputState) => inputState
);

export const selectConnectionState = createSelector(
  selectConnectionFeature,
  (connectionState: ConnectionState) => connectionState
);

export const selectIsRequestingConnection = createSelector(
  selectConnectionFeature,
  (connectionState: ConnectionState) => connectionState.isRequestingConnection
);


export const selectIsConnectionEstablished = createSelector(
  selectConnectionFeature,
  (connectionState: ConnectionState) => connectionState.connectionEstablished
);


export const selectNoiseSensitivity = createSelector(
  selectInputFeature,
  (state: InputState) => state.noiseSensitivity
);

export const selectVibrationSensitivity = createSelector(
  selectInputFeature,
  (state: InputState) => state.vibrationSensitivity
);

export const selectFontSize = createSelector(
  selectInputFeature,
  (state: InputState) => state.fontSize
);

export const selectDisplayBrightness = createSelector(
  selectInputFeature,
  (state: InputState) => state.displayBrightness
);

export const selectProcessingToggle = createSelector(
  selectInputFeature,
  (state: InputState) => state.processingToggle
);

export const selectClassificationToggle = createSelector(
  selectInputFeature,
  (state: InputState) => state.classificationToggle
);

export const selectMessageLog = createSelector(
  selectSTTFeature,
  (state: STTState) => state.messageLog
);

