import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../shared/infrastructure/api/base-api.service';
import { DeviceAssignment } from '../../domain/model/device-assignment.entity';
import { DeviceAssignmentAssembler } from '../assemblers/device-assignment.assembler';
import { DeviceAssignmentResource } from '../resources/device-assignment.resource';
import { DeviceAssignmentResponse } from '../responses/device-assignment.response';

@Injectable({
  providedIn: 'root',
})
export class DeviceAssignmentsApiService extends BaseApiService<
  DeviceAssignment,
  DeviceAssignmentResource,
  DeviceAssignmentResponse
> {
  constructor(http: HttpClient) {
    super(http, 'deviceAssignments', new DeviceAssignmentAssembler());
  }

  findByUserId(userId: number): Observable<DeviceAssignmentResponse[]> {
    return this.http.get<DeviceAssignmentResponse[]>(
      `${this.apiBaseUrl}/deviceAssignments?userId=${userId}`
    );
  }
}
