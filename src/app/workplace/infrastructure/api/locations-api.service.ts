import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApiService } from '../../../shared/infrastructure/api/base-api.service';
import { Location } from '../../domain/model/location.entity';
import { LocationAssembler } from '../assemblers/location.assembler';
import { LocationResource } from '../resources/location.resource';
import { LocationResponse } from '../responses/location.response';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService extends BaseApiService<
  Location,
  LocationResource,
  LocationResponse
> {
  constructor(http: HttpClient) {
    super(http, 'locations', new LocationAssembler());
  }
}
