
import { createReducer, on } from '@ngrx/store';
import { request } from 'express';
import { requestConnection, updateConnection } from './connection.actions';


export interface ConnectionState  {
  isRequestionConnection: boolean;
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
  on(updateConnection, (state: any, { payload }: any) => ({
    ...state,
    connection: payload,
    connectionEstablished: true,
    isRequestingConnection: false,
  }))
);
