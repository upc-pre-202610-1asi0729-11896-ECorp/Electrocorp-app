import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { User } from '../../domain/model/user.entity';
import { UserResponse } from '../responses/user.response';

export class UserAssembler extends BaseAssembler<
  User,
  BaseResource,
  UserResponse
> {
  override toEntity(response: UserResponse): User {
    return new User({
      id: response.id,
      fullName: response.fullName,
      email: response.email,
      status: response.status,
    });
  }

  override toResource(): BaseResource {
    return {};
  }
}
