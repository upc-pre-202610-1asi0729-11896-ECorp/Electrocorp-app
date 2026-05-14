import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../shared/infrastructure/api/base-api.service';
import { Room } from '../../domain/model/room.entity';
import { RoomAssembler } from '../assemblers/room.assembler';
import { RoomResource } from '../resources/room.resource';
import { RoomResponse } from '../responses/room.response';

@Injectable({
  providedIn: 'root',
})
export class RoomsApiService extends BaseApiService<
  Room,
  RoomResource,
  RoomResponse
> {
  constructor(http: HttpClient) {
    super(http, 'rooms', new RoomAssembler());
  }

  findByLocationId(locationId: number): Observable<RoomResponse[]> {
    return this.http.get<RoomResponse[]>(
      `${this.apiBaseUrl}/rooms?locationId=${locationId}`
    );
  }
}
