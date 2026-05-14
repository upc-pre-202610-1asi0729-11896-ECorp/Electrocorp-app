import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-metrics-cards',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './metrics-cards.component.html',
  styleUrl: './metrics-cards.component.scss',
})
export class MetricsCardsComponent {
  @Input({ required: true }) totalWatts = 0;
  @Input({ required: true }) averageWatts = 0;
  @Input({ required: true }) highestReading = 0;
}
