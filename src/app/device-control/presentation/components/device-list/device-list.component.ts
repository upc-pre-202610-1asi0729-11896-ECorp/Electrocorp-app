import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Device } from '../../../domain/model/device.entity';
import { DeviceCardComponent } from '../device-card/device-card.component';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [DeviceCardComponent, TranslatePipe],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss',
})
export class DeviceListComponent {
  @Input({ required: true }) devices: Device[] = [];

  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  trackByDeviceId(index: number, device: Device): number {
    return device.id;
  }
}
