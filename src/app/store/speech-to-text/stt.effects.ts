import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap, delay, bufferTime } from 'rxjs/operators';
import { DataRequestService } from 'src/app/data-request-service/data-request.service';
import { addMessageRequest, addMessageSuccess } from './stt.actions';


@Injectable()
export class STTEffects {
  requestInputUpdate = createEffect(() =>
    this.actions.pipe(
      ofType(addMessageRequest),
      switchMap((request) => {
        const message = request;

        // const formattedMessage = `(${message.datetime}) ${message.message}`;
        this.dataService.requestMessageUpdate({message: message.message, datetime: message.datetime});
        return of(request);
      }),
      map((request) => {
        return addMessageSuccess({message:request.message,datetime:request.datetime})
      }),
    )
  );

  constructor(
    private actions: Actions,
    private dataService: DataRequestService,
  ) {}
}
