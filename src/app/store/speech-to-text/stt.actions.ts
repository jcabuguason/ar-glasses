import { createAction, props } from '@ngrx/store';

export const addMessageRequest = createAction(
  '[Speech to Text] Add Message',
  props<{ message: string; datetime: string }>()
);

export const addMessageSuccess = createAction(
  '[Speech to Text] Message Success',
  props<{ message: string; datetime: string }>()
);

export const clearLog = createAction('[Speech to Text] Clear Message Log');
