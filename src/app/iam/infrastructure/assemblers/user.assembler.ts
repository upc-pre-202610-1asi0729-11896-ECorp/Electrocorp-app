import { User } from '../../domain/model/user.entity';
import type { UserResponse } from '../responses/user.response';

export class UserAssembler {
    static toEntity(response: UserResponse): User {
        return new User({
            id: response.id,
            fullName: response.fullName,
            email: response.email,
            status: response.status,
        });
    }
}