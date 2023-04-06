import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap, delay } from 'rxjs/operators';
import { ConnectionService } from 'src/app/connection-service/connection.service';
import {
  failedConnection,
  requestConnection,
  requestDisconnection,
  successfulConnection,
  successfulDisconnection,
} from './connection.actions';
import { StatusService } from 'src/app/status.service';
import { StatusURL } from 'src/app/status/status-url.enum';

@Injectable()
export class ConnectionEffects {
  requestConnection = createEffect(() =>
    this.actions.pipe(
      ofType(requestConnection),
      switchMap(() => this.statusService.sendStatus(StatusURL.ConnectionRequest,true)),
      delay(2000),
      map((value) => {

        
        if(value){
          return successfulConnection({ connection: '' });
        }
        return failedConnection();
      }),
      catchError(() => of(failedConnection()))
    )
  );

  performDisconnectRequest = createEffect(() =>
  this.actions.pipe(
    ofType(requestDisconnection),
    switchMap(() => this.statusService.sendStatus(StatusURL.DisconnectRequest,true)),
    delay(2000),
    map((value) => {
      if(value){
        return successfulDisconnection();
      }
      return failedConnection();
    }),
    catchError(() => of(failedConnection()))
  )
);

  constructor(
    private actions: Actions,
    private statusService: StatusService
  ) {}
}
