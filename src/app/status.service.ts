import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { StatusURL } from './status/status-url.enum';

@Injectable({
  providedIn: 'root',
})
export class StatusService {

  constructor(private http: HttpClient) {}

  // Get the status based on endpoint
  getStatus(statusUrl: StatusURL): Observable<void | any> {
    return this.http.get<any>(statusUrl);
  }

  // Send update status to endpoint
  sendStatus(statusUrl: StatusURL, value: any): Observable<any>{
    return this.http.post(statusUrl,{value: value});
  }

  // Error handling
  private error(error: any) {
    let message = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    console.error(message);
  }
}
