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
      delay(1000),
      switchMap((request) => {
        this.dataService.requestTextToSpeech()
        return of(request);
      }),
      map((request) => {
        return addMessageSuccess(request)
      }),
    )
  );

  constructor(
    private actions: Actions,
    private dataService: DataRequestService,
  ) {}
}
