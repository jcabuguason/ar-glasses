import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, Message } from 'primeng/api';
import { Messages } from 'primeng/messages';
import { StatusService } from './status.service';
import { select, Store } from '@ngrx/store';
import { requestConnection } from './store/connection/connection.actions';
import { Router } from '@angular/router';
import {
  AppState,
  selectIsConnectionEstablished,
  selectIsRequestingConnection,
} from './store/app.state';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs';
import { StatusURL } from './status/status-url.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ar-glasses';
  items: MenuItem[] = [];
  connected = false;
  requestingConnection = false;

  public messages: Message[] = [
    {
      severity: 'info',
      summary: 'Connection',
      detail:
        'Not connected to AR Glasses. Check that the power of the device is on and connected the device via bluetooth',
      closable: false,
    },
  ];

  constructor(
    private statusService: StatusService,
    private store: Store<AppState>,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Device Hardware Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: '/noise-sensitivity',
      },
      {
        label: 'Connection',
        icon: 'pi pi-fw pi-wifi',
        routerLink: '/settings',
      },
      {
        label: 'Text to Speech',
        icon: 'pi pi-fw pi-microphone',
        routerLink: '/speech',
      },
    ];

    
    // setInterval(()=>{
    //   this.statusService.getStatus(StatusURL.Connection).pipe(take(1)).subscribe((result: any) => {
    //     console.log("Connection:" + result.value);
    //   });  
    // },1000)

    this.store
      .pipe(select(selectIsRequestingConnection))
      .subscribe((isRequestingConnection) => {
        this.requestingConnection = isRequestingConnection;
      });

    this.store
      .pipe(select(selectIsConnectionEstablished))
      .subscribe((isConnectionEstablished) => {
        if (isConnectionEstablished) {
          this.connected = true;
          this.router.navigate(['settings']);
        }
      });
  }

  connect() {

    console.log('dispatching connection request');

    this.store.dispatch(requestConnection());
  }
}
