
import { createReducer, on } from '@ngrx/store';
import { request } from 'express';
import { requestConnection, successfulConnection } from './connection.actions';


export interface ConnectionState  {
  isRequestingConnection: boolean;
  connectionEstablished: boolean;
  connection: any;
}

export const connectionState = {
  input: ([] = []),
  isRequestingConnection: false,
  connectionEstablished: false,
};

export const connectionReducer = createReducer(
  connectionState,
  on(requestConnection, (state: any) => ({
    ...state,
    isRequestingConnection: true,
  })),
  on(successfulConnection, (state: any, { payload }: any) => ({
    ...state,
    connection: payload,
    connectionEstablished: true,
    isRequestingConnection: false,
  }))
);
