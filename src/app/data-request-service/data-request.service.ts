import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRequestService {

  constructor() { }

  requestInputUpdate(inputID: number, inputValue: number){
    return of({inputID: inputID, inputValue: inputValue})
  }
  
  requestTextToSpeech(){
    return of({message:'Hello'})
  }

  requestClassification(){
    return of({classification: 'Lightning'});
  }

  clearTextToSpeech(){
    return of({response:'success'})
  }
}
