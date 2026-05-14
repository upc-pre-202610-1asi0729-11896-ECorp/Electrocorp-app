import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { Location } from '../../domain/model/location.entity';
import { LocationResource } from '../resources/location.resource';
import { LocationResponse } from '../responses/location.response';

export class LocationAssembler extends BaseAssembler<
  Location,
  LocationResource,
  LocationResponse
> {
  override toEntity(response: LocationResponse): Location {
    return new Location({
      id: response.id,
      name: response.name,
      address: response.address,
      city: response.city,
      country: response.country,
      type: response.type,
    });
  }

  override toResource(entity: Location): LocationResource {
    return {
      name: entity.name,
      address: entity.address,
      city: entity.city,
      country: entity.country,
      type: entity.type,
    };
  }
}
