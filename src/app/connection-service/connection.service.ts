import { Injectable } from '@angular/core';
import { of, take } from 'rxjs';
import { StatusService } from '../status.service';
import { StatusURL } from '../status/status-url.enum';
import { requestConnection } from '../store/connection/connection.actions';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {

  constructor(private statusService: StatusService) {}
}
