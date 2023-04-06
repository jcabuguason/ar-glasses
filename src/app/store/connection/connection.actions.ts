import { createAction, props } from '@ngrx/store';

export const requestConnection = createAction('[Connection Request] Init');

export const requestDisconnection = createAction('[Disconnection] Request');

export const successfulConnection = createAction(
  '[Connection Request] Success',
  props<{ connection: {} }>()
);

export const successfulDisconnection = createAction(
  '[Disconnection] Success'
);

export const failedConnection = createAction('[Connection Request] Error');
