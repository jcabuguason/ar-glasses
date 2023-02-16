import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private statusUrl = '/api/status';

  constructor(private http: HttpClient) {}

  // Get the status
  getStatus(): Observable<void | any> {
    return this.http.get<any>(this.statusUrl);
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
