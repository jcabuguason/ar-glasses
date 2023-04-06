import { Injectable } from '@angular/core';
import { of, take, withLatestFrom } from 'rxjs';
import { StatusService } from '../status.service';
import { StatusURL } from '../status/status-url.enum';
import { requestInputUpdate } from '../store/input/input.actions';
import {
  AppState,
  selectDisplayBrightness,
  selectInputState,
  selectMessageLog,
  selectNoiseSensitivity,
  selectSTTFeature,
} from '../store/app.state';
import { Store } from '@ngrx/store';
import { InputType } from '../noise-sensitivity/input.enum';
import { addMessageRequest } from '../store/speech-to-text/stt.actions';
import { InputState } from '../store/input/input.selectors';

@Injectable({
  providedIn: 'root',
})
export class DataRequestService {

  private formerData: any = {
    noiseSensitivity: 0,
    vibrationSensitivity: 0,
    fontSize: 0,
    displayBrightness: 0,
    classificationToggle: false,
    processingToggle: false,
    messageLog:[] = [""],
  }

  constructor(
    private store: Store<AppState>,
    private statusService: StatusService
  ) {
    setInterval(() => {
      this.statusService
        .getStatus(StatusURL.AllStatuses)
        .pipe(
          take(1),
          withLatestFrom(
            this.store.select(selectInputState),
            this.store.select(selectMessageLog)
          )
        )
        .subscribe(([request, inputState, messageLog]) => {
          // console.log(request);

          if (request.brightness != inputState.displayBrightness && request.brightness != this.formerData.displayBrightness) {

            this.formerData.displayBrightness = request.brightness;
            this.store.dispatch(
              requestInputUpdate({
                inputID: InputType.DisplayBrightness,
                inputValue: request.brightness,
              })
            );
          }

          if (request.bitDepth != inputState.noiseSensitivity && request.bitDepth != this.formerData.noiseSensitivity) {
            this.formerData.noiseSensitivity = request.bitDepth;
            this.store.dispatch(
              requestInputUpdate({
                inputID: InputType.NoiseSensitivity,
                inputValue: request.bitDepth,
              })
            );
          }

          if (request.toggleClassification != inputState.classificationToggle && request.classificationToggle != this.formerData.classificationToggle) {
            this.formerData.classificationToggle = request.toggleClassification;
            this.store.dispatch(
              requestInputUpdate({
                inputID: InputType.ClassificationToggle,
                inputValue: request.toggleClassification,
              })
            );
          }

          if (request.toggleProcessing != inputState.processingToggle && request.processingToggle != this.formerData.processingToggle) {
            this.formerData.processingToggle = request.processingToggle;
            this.store.dispatch(
              requestInputUpdate({
                inputID: InputType.ProcessingToggle,
                inputValue: request.toggleProcessing,
              })
            );
          }

          let alreadyExists = false;

          const message: { message: string; datetime: string } = request.message;
          const formattedMessage = `(${message.datetime}) ${message.message}`;
          // this.store.dispatch(addMessageRequest({message: message.message, datetime: message.datetime}));

          for (const message in messageLog) {
            if (message.localeCompare(formattedMessage)) {
              alreadyExists = true;
            }
          }

          if (!alreadyExists) {
            console.log('does not exist yet');
            console.log(message)
            this.formerData.messageLog?.push(message);
            this.store.dispatch(
              addMessageRequest({
                message: message.message,
                datetime: message.datetime,
              })
            );
          }
        });
    }, 1000);
  }

  requestInputUpdate(inputID: number, inputValue: number) {
    if(inputID == InputType.NoiseSensitivity){
      this.statusService.sendStatus(StatusURL.BitDepth,inputValue).pipe(take(1)).subscribe((data)=>{
        console.log(data);
      });
    }
    else if(inputID == InputType.DisplayBrightness){
      this.statusService.sendStatus(StatusURL.Brightness,inputValue).pipe(take(1)).subscribe((data)=>{
        console.log(data);
      });
    }
    else if(inputID == InputType.ProcessingToggle){
      this.statusService.sendStatus(StatusURL.ProcessingToggle,inputValue).pipe(take(1)).subscribe((data)=>{
        console.log(data);
      });
    }
    else if(inputID == InputType.ClassificationToggle){
      this.statusService.sendStatus(StatusURL.ClassificationToggle,inputValue).pipe(take(1)).subscribe((data)=>{
        console.log(data);
      });
    }
  }

  requestMessageUpdate(message: any) {
    this.statusService.sendStatus(StatusURL.STTMessage,message).pipe(take(1)).subscribe()
  }
  // const formattedMessage = `(${message.datetime}) ${message.message}`;
  requestClassification() {
    return of({ classification: 'Lightning' });
  }

  clearTextToSpeech() {
    return of({ response: 'success' });
  }
}
