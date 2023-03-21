import { createAction, props } from '@ngrx/store';

export const requestInputUpdate = createAction(
  '[Input Update] Request',
  props<{ inputID: number; inputValue: number }>()
);

export const updateInputSuccess = createAction(
  '[Input Update] Success',
  props<{ inputID: number; inputValue: string }>()
);

export const updateInputFailure = createAction(
  '[Input Update] Failure',
  props<{ inputID: number; inputValue: string }>()
);
