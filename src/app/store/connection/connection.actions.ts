import { createAction, props } from '@ngrx/store';

export const requestConnection = createAction('[Connection] Update');

export const updateConnection = createAction(
  '[Connection] Initialize',
  props<{ connection: {} }>()
);
