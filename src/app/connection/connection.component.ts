import { Component } from '@angular/core';
import { Event } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent {
  public selectedDevice: any;
  public devices: any[];

  constructor(private dialogService: DialogService, private confirmationService: ConfirmationService) {
    this.devices = [
      { name: "Ahmad's Iphone", mac_address: '34ddf:dfs3312:fds' },
      { name: "John's Laptop", mac_address: '34fD34:343:343' },
    ];
  }

  public confirm(event: any) {
    this.confirmationService.confirm({
      target: event?.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //confirm action
      },
      reject: () => {
          //reject action
      }
  });
  }
}
