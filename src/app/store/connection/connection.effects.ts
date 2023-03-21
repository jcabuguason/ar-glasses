import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap, delay } from 'rxjs/operators';
import { ConnectionService } from 'src/app/connection-service/connection.service';
import {
  failedConnection,
  requestConnection,
  successfulConnection,
} from './connection.actions';

@Injectable()
export class ConnectionEffects {
  requestConnection = createEffect(() =>
    this.actions.pipe(
      ofType(requestConnection),
      switchMap(() => this.connectionService.connectToGlasses()),
      delay(5000),
      map(() => {
        return successfulConnection({ connection: '' });
      }),
      catchError(() => of(failedConnection()))
    )
  );

  constructor(
    private actions: Actions,
    private connectionService: ConnectionService
  ) {}
}
