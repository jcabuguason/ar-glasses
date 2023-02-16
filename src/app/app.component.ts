import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ar-glasses';
  items: MenuItem[] = [];
  connected = false;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Device Hardware Settings',
        icon:'pi pi-fw pi-cog',
        routerLink: '/noise-sensitivity',
        // items: [
        //   {
        //     label: 'Noise Sensitivity',
        //     icon: 'pi pi-fw pi-volume-up',
        //     url: '/noise-sensitivity#noise-sensitivity-slider'
        //   },
        //   {
        //     label: 'Vibration Sensitivity',
        //     icon: 'pi pi-fw pi-angle-double-up',
        //     url: '/noise-sensitivity#vibrationSensitivity'
        //   },
        //   {
        //     label: 'Vibration Sensitivity',
        //     icon: 'pi pi-fw pi-angle-double-up',
        //     url: '/noise-sensitivity#fontSettings'
        //   },
        // ]
      },
      {
        label: 'Connection',
        icon: 'pi pi-fw pi-wifi',
        routerLink: '/settings',
      },
      {
        label: 'Text to Speech',
        icon: 'pi pi-fw pi-book',
        routerLink: '/speech',
      },


    ];
  }

  connect(){
    this.connected=true;
  }
}
