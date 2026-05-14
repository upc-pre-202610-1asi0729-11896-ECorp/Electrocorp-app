import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import { UserStatus } from '../../domain/model/user.entity';

export interface UserResponse extends BaseResponse<number> {
  fullName: string;
  email: string;
  password?: string;
  status: UserStatus;
}
