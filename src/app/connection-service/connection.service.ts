import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  public connectToGlasses() {
    return of({ connection: 'connected' });
  }
  constructor() {}
}
