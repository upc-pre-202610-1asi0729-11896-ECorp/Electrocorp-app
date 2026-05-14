import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import {
  DeviceType,
} from '../../../domain/model/device.entity';
import { DeviceControlFacade } from '../../../application/services/device-control.facade';
import { DeviceListComponent } from '../../components/device-list/device-list.component';

@Component({
  selector: 'app-devices-page',
  standalone: true,
  imports: [FormsModule, TranslatePipe, DeviceListComponent],
  templateUrl: './devices-page.component.html',
  styleUrl: './devices-page.component.scss',
})
export class DevicesPageComponent implements OnInit {
  name = '';
  room = '';
  type: DeviceType = 'SMART_PLUG';
  powerWatts = 100;

  readonly deviceTypes: DeviceType[] = ['SMART_PLUG', 'SMART_SWITCH', 'LIGHT'];

  constructor(readonly deviceControlFacade: DeviceControlFacade) {}

  async ngOnInit(): Promise<void> {
    await this.deviceControlFacade.loadDevices();
  }

  async handleSubmit(): Promise<void> {
    await this.deviceControlFacade.addDevice({
      name: this.name,
      room: this.room,
      type: this.type,
      powerWatts: Number(this.powerWatts),
    });

    this.name = '';
    this.room = '';
    this.type = 'SMART_PLUG';
    this.powerWatts = 100;
  }
}
