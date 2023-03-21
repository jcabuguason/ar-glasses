import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap, delay, bufferTime } from 'rxjs/operators';
import { ConnectionService } from 'src/app/connection-service/connection.service';
import { DataRequestService } from 'src/app/data-request-service/data-request.service';
import {
  requestInputUpdate,
  updateInputFailure,
  updateInputSuccess,
} from './input.actions';

@Injectable()
export class InputEffects {
  requestInputUpdate = createEffect(() =>
    this.actions.pipe(
      ofType(requestInputUpdate),
      delay(1000),
      switchMap((request) => {
        this.dataService.requestInputUpdate(request.inputID,request.inputValue)
        return of(request);
      }),
      map((request) => {
        return updateInputSuccess({
          inputID: request.inputID,
          inputValue: request.inputValue as unknown as string,
        });
      }),
      catchError((request) =>
        of(
          updateInputFailure({
            inputID: request.inputID,
            inputValue: request.inputValue as unknown as string,
          })
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private dataService: DataRequestService,
  ) {}
}
