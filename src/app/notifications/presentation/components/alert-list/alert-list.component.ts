import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Alert } from '../../../domain/model/alert.entity';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [DatePipe, TranslatePipe],
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
})
export class AlertListComponent {
  @Input({ required: true }) alerts: Alert[] = [];

  @Output() markAsRead = new EventEmitter<number>();
}
