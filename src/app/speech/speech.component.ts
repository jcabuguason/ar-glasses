import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent {
  private messages : Message[]
  public messageLog: string = "";
  public isRecording: boolean;

  constructor(){
    this.messages = [];
    this.isRecording = false;
  }

  ngOnInit(){

  }

  private convertMessagesToMessageLog(){
    for(let message of this.messages){
      this.messageLog.concat('\n('+ message.creationDateTime+') ' + message.content  )
    }
  }

  startRecording(){
    console.log('start');
    setTimeout(()=>{
      this.messageLog = this.messageLog.concat('\n(2023-01-20:12:23:00) Hi. Can I take your order?');
    },2000)

    setTimeout(()=>{
      this.messageLog = this.messageLog.concat('\n(2023-01-20:12:24:20) Yes please. Can I get an iced caffe americano?');
    },4000)

    setTimeout(()=>{
      this.messageLog = this.messageLog.concat('\n(2023-01-20:12:24:42) Of course.');
    },6000);

    let number = 8000;
    for(let i = 0; i < 2; i++){
      setTimeout(()=>{
        this.messageLog = this.messageLog.concat('\n...');
      },number+=2000);
    }

    setTimeout(()=>{
      this.messageLog = this.messageLog.concat('\n(2023-01-20:12:34:42) Next stop. Dundas Station.');
    },number+=2000);

    setTimeout(()=>{
      this.messageLog = this.messageLog.concat('\n(2023-01-20:12:35:42) Now arriving at Dundas Station.');
    },number+=2000);

    setTimeout(()=>{
      this.messageLog = this.messageLog.concat('\n...');
    },number+=2000);

    setTimeout(()=>{
        this.messageLog = this.messageLog.concat('\n(2023-01-20:12:40:42) Hello class.');
    },number+=2000);
  }

  clearText(){
      this.messageLog = "";
  }
}
