import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval } from 'rxjs';
import { Message } from '../models/message.model';
import { AppState, selectMessageLog } from '../store/app.state';
import {
  addMessageRequest,
  clearLog,
} from '../store/speech-to-text/stt.actions';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss'],
})
export class SpeechComponent {
  private messages: Message[];
  public messageLog: string = '';
  public isRecording: boolean;

  constructor(private store: Store<AppState>) {
    this.messages = [];
    this.isRecording = false;
  }

  ngOnInit() {
    this.store.select(selectMessageLog).subscribe((messageLog) => {
      this.messages = messageLog;
      this.convertMessagesToMessageLog(this.messages);
    });
  }

  private convertMessagesToMessageLog(messages: any[]) {
    this.messageLog = "";
    for (let message of messages) {
      this.messageLog.concat(
        '\n(' + message.dateTime + ') ' + message.message
      );
    }
    console.log(this.messageLog);
  }


  startRecording() {
    console.log('start');
    setTimeout(() => {
      this.store.dispatch(
        addMessageRequest({
          message: 'Hi. Can I take your order?',
          datetime: '2023-01-20:12:23:00',
        })
      );
      // this.messageLog = this.messageLog.concat(
      //   '\n(2023-01-20:12:23:00) Hi. Can I take your order?'
      // );
    }, 2000);

    setTimeout(() => {
      this.store.dispatch(
        addMessageRequest({
          message: 'Yes please. Can I get an iced caffe americano?',
          datetime: '2023-01-20:12:24:20',
        })
      );
      // this.messageLog = this.messageLog.concat(
      //   '\n(2023-01-20:12:24:20) Yes please. Can I get an iced caffe americano?'
      // );
    }, 4000);

    // setTimeout(() => {
    //   this.messageLog = this.messageLog.concat(
    //     '\n(2023-01-20:12:24:42) Of course.'
    //   );
    // }, 6000);

    // let number = 8000;
    // for (let i = 0; i < 2; i++) {
    //   setTimeout(() => {
    //     this.messageLog = this.messageLog.concat('\n...');
    //   }, (number += 2000));
    // }

    // setTimeout(() => {
    //   this.messageLog = this.messageLog.concat(
    //     '\n(2023-01-20:12:34:42) Next stop. Dundas Station.'
    //   );
    // }, (number += 2000));

    // setTimeout(() => {
    //   this.messageLog = this.messageLog.concat(
    //     '\n(2023-01-20:12:35:42) Now arriving at Dundas Station.'
    //   );
    // }, (number += 2000));

    // setTimeout(() => {
    //   this.messageLog = this.messageLog.concat('\n...');
    // }, (number += 2000));

    // setTimeout(() => {
    //   this.messageLog = this.messageLog.concat(
    //     '\n(2023-01-20:12:40:42) Hello class.'
    //   );
    // }, (number += 2000));
  }

  clearText() {
    this.store.dispatch(clearLog());
    this.messageLog = '';
  }
}
