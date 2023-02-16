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
