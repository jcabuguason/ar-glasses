import { createAction, props } from '@ngrx/store';

export const addMessage = createAction(
  '[Speech to Text] Add Message',
  props<{ message: string; datetime: string }>()
);

export const clearLog = createAction(
  '[Speech to Text] Clear Message Log',
  props<{ message: string; datetime: string }>()
);

