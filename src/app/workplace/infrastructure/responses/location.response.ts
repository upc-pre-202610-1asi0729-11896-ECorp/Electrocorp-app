import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import { LocationType } from '../../domain/model/location.entity';

export interface LocationResponse extends BaseResponse<number> {
  name: string;
  address: string;
  city: string;
  country: string;
  type: LocationType;
}
