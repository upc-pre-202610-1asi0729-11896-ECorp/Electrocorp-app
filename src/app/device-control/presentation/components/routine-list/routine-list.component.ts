import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Routine } from '../../../domain/model/routine.entity';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.scss',
})
export class RoutineListComponent {
  @Input({ required: true }) routines: Routine[] = [];
  @Input({ required: true }) getDeviceName!: (deviceId: number) => string;

  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
}
