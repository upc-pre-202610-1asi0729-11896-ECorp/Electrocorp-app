import { Injectable } from '@angular/core';

import { Alert, AlertLevel } from '../model/alert.entity';

@Injectable({
  providedIn: 'root',
})
export class AlertPriorityService {
  sortByPriorityAndDate(alerts: Alert[]): Alert[] {
    return [...alerts].sort((first, second) => {
      const levelDifference =
        this.getLevelWeight(second.level) - this.getLevelWeight(first.level);

      if (levelDifference !== 0) return levelDifference;

      return (
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime()
      );
    });
  }

  private getLevelWeight(level: AlertLevel): number {
    const weights: Record<AlertLevel, number> = {
      INFO: 1,
      WARNING: 2,
      CRITICAL: 3,
    };

    return weights[level];
  }
}
