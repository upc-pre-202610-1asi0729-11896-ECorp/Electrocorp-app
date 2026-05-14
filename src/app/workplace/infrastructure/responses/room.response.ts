import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';

export interface RoomResponse extends BaseResponse<number> {
  locationId: number;
  name: string;
  floor: number;
}
