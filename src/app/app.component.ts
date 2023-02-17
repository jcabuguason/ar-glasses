import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, Message } from 'primeng/api';
import { Messages } from 'primeng/messages';
import { StatusService } from './status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ar-glasses';
  items: MenuItem[] = [];
  connected = false;
  public messages: Message[] = [
    {
      severity: 'info',
      summary: 'Connection',
      detail:
        'Not connected to AR Glasses. Check that the power of the device is on and connected the device via bluetooth',
      closable: false,
    },
  ];

  constructor(private statusService: StatusService) {}

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

    this.statusService.getStatus().subscribe((result: any) => {
      console.log(result);
    });
  }

  connect() {
    this.connected = true;
  }
}
