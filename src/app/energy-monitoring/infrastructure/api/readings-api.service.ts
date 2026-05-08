import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../shared/infrastructure/api/base-api.service';
import { EnergyReading } from '../../domain/model/energy-reading.entity';
import { EnergyReadingAssembler } from '../assemblers/energy-reading.assembler';
import { EnergyReadingResource } from '../resources/energy-reading.resource';
import { EnergyReadingResponse } from '../responses/energy-reading.response';

@Injectable({
  providedIn: 'root',
})
export class ReadingsApiService extends BaseApiService<
  EnergyReading,
  EnergyReadingResource,
  EnergyReadingResponse
> {
  constructor(http: HttpClient) {
    super(http, 'energyReadings', new EnergyReadingAssembler());
  }

  findByDateRange(
    startDate: string,
    endDate: string
  ): Observable<EnergyReadingResponse[]> {
    return this.http.get<EnergyReadingResponse[]>(
      `${this.apiBaseUrl}/energyReadings?recordedAt_gte=${startDate}&recordedAt_lte=${endDate}`
    );
  }
}
