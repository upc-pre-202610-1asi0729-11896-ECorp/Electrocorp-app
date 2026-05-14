import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { AccessProfile } from '../../domain/model/access-profile.entity';
import { AccessProfileResponse } from '../responses/access-profile.response';

export class AccessProfileAssembler extends BaseAssembler<
  AccessProfile,
  BaseResource,
  AccessProfileResponse
> {
  override toEntity(response: AccessProfileResponse): AccessProfile {
    return new AccessProfile({
      id: response.id,
      name: response.name,
      permissions: response.permissions,
    });
  }

  override toResource(): BaseResource {
    return {};
  }
}
