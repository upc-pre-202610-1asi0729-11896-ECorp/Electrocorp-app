import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { WorkplaceFacade } from '../../../application/services/workplace.facade';

@Component({
  selector: 'app-workplace-overview-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './workplace-overview-page.component.html',
  styleUrl: './workplace-overview-page.component.scss',
})
export class WorkplaceOverviewPageComponent implements OnInit {
  constructor(readonly workplaceFacade: WorkplaceFacade) {}

  async ngOnInit(): Promise<void> {
    await this.workplaceFacade.loadWorkplace();
  }
}
