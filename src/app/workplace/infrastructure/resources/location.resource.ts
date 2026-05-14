import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { LocationType } from '../../domain/model/location.entity';

export interface LocationResource extends BaseResource {
  name: string;
  address: string;
  city: string;
  country: string;
  type: LocationType;
}
