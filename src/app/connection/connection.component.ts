import { Component } from '@angular/core';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent {

  public selectedDevice: any;
  public devices: any[];

  constructor(){
    this.devices = [{name:"Ahmad's Iphone", mac_address: "34ddf:dfs3312:fds"},{name:"John's Laptop", mac_address:"34fD34:343:343"}]
  }
}
