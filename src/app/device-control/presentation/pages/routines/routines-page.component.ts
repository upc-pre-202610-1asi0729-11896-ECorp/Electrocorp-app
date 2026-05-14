import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { RoutineAction } from '../../../domain/model/routine.entity';
import { DeviceControlFacade } from '../../../application/services/device-control.facade';
import { RoutineListComponent } from '../../components/routine-list/routine-list.component';

@Component({
  selector: 'app-routines-page',
  standalone: true,
  imports: [FormsModule, TranslatePipe, RoutineListComponent],
  templateUrl: './routines-page.component.html',
  styleUrl: './routines-page.component.scss',
})
export class RoutinesPageComponent implements OnInit {
  name = '';
  deviceId: number | null = null;
  action: RoutineAction = 'TURN_OFF';
  scheduledTime = '23:00';

  readonly routineActions: RoutineAction[] = ['TURN_ON', 'TURN_OFF'];

  constructor(readonly deviceControlFacade: DeviceControlFacade) {}

  async ngOnInit(): Promise<void> {
    await this.deviceControlFacade.loadDevices();
    await this.deviceControlFacade.loadRoutines();
  }

  async handleSubmit(): Promise<void> {
    if (!this.deviceId) return;

    await this.deviceControlFacade.addRoutine({
      name: this.name,
      deviceId: Number(this.deviceId),
      action: this.action,
      scheduledTime: this.scheduledTime,
    });

    this.name = '';
    this.deviceId = null;
    this.action = 'TURN_OFF';
    this.scheduledTime = '23:00';
  }

  getDeviceName = (deviceId: number): string =>
    this.deviceControlFacade.getDeviceName(deviceId);
}
