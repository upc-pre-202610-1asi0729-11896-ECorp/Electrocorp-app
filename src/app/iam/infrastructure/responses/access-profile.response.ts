import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';

export interface AccessProfileResponse extends BaseResponse<number> {
  name: string;
  permissions: string[];
}
