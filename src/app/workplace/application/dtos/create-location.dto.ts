import { LocationType } from '../../domain/model/location.entity';

export interface CreateLocationDto {
  name: string;
  address: string;
  city: string;
  country: string;
  type: LocationType;
}
