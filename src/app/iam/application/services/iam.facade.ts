import { IamApiEndpoint } from '../../infrastructure/api/iam-api-endpoint';
import { UserAssembler } from '../../infrastructure/assemblers/user.assembler';
import { AccessProfileAssembler } from '../../infrastructure/assemblers/access-profile.assembler';
import type { SignInDto } from '../dtos/sign-in.dto';
import type { SignUpDto } from '../dtos/sign-up.dto';
import type { User } from '../../domain/model/user.entity';
import type { AccessProfile } from '../../domain/model/access-profile.entity';

export class IamFacade {
    private readonly iamApi = new IamApiEndpoint();

    async signIn(payload: SignInDto): Promise<{
        user: User;
        accessProfiles: AccessProfile[];
    }> {
        const response = await this.iamApi.signIn({
            email: payload.email,
            password: payload.password,
        });

        return {
            user: UserAssembler.toEntity(response.user),
            accessProfiles: response.accessProfiles.map(AccessProfileAssembler.toEntity),
        };
    }

    async signUp(payload: SignUpDto): Promise<{
        user: User;
        accessProfiles: AccessProfile[];
    }> {
        const response = await this.iamApi.signUp({
            fullName: payload.fullName,
            email: payload.email,
            password: payload.password,
        });

        return {
            user: UserAssembler.toEntity(response.user),
            accessProfiles: response.accessProfiles.map(AccessProfileAssembler.toEntity),
        };
    }

    async restoreSession(): Promise<{
        user: User;
        accessProfiles: AccessProfile[];
    } | null> {
        const response = await this.iamApi.restoreSession();

        if (!response) return null;

        return {
            user: UserAssembler.toEntity(response.user),
            accessProfiles: response.accessProfiles.map(AccessProfileAssembler.toEntity),
        };
    }

    async signOut(): Promise<void> {
        await this.iamApi.signOut();
    }
}