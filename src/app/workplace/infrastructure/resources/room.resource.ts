import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';

export interface RoomResource extends BaseResource {
  locationId: number;
  name: string;
  floor: number;
}
