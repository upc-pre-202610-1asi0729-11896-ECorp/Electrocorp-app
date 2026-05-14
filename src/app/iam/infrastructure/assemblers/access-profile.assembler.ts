import { AccessProfile } from '../../domain/model/access-profile.entity';
import type { AccessProfileResponse } from '../responses/access-profile.response';

export class AccessProfileAssembler {
    static toEntity(response: AccessProfileResponse): AccessProfile {
        return new AccessProfile({
            id: response.id,
            name: response.name,
            permissions: response.permissions,
        });
    }
}