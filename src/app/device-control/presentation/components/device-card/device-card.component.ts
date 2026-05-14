import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Device } from '../../../domain/model/device.entity';

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.scss',
})
export class DeviceCardComponent {
  @Input({ required: true }) device!: Device;

  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onToggle(): void {
    this.toggle.emit(this.device.id);
  }

  onRemove(): void {
    this.remove.emit(this.device.id);
  }
}
