import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../shared/infrastructure/api/base-api.service';
import { ConsumptionReport } from '../../domain/model/consumption-report.entity';
import { ConsumptionReportAssembler } from '../assemblers/consumption-report.assembler';
import { ConsumptionReportResource } from '../resources/consumption-report.resource';
import { ConsumptionReportResponse } from '../responses/consumption-report.response';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionReportsApiService extends BaseApiService<
  ConsumptionReport,
  ConsumptionReportResource,
  ConsumptionReportResponse
> {
  constructor(http: HttpClient) {
    super(http, 'consumptionReports', new ConsumptionReportAssembler());
  }

  findByUserId(userId: number): Observable<ConsumptionReportResponse[]> {
    return this.http.get<ConsumptionReportResponse[]>(
      `${this.apiBaseUrl}/consumptionReports?userId=${userId}`
    );
  }
}
