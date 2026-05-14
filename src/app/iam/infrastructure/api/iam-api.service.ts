import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from '../../../shared/infrastructure/api/api-config';
import { SignInResource } from '../resources/sign-in.resource';
import { SignUpResource } from '../resources/sign-up.resource';
import { UserResponse } from '../responses/user.response';
import { AccessProfileResponse } from '../responses/access-profile.response';

@Injectable({
  providedIn: 'root',
})
export class IamApiService {
  private readonly apiBaseUrl = API_BASE_URL;

  constructor(private readonly http: HttpClient) {}

  async signIn(resource: SignInResource): Promise<{
    user: UserResponse;
    accessProfiles: AccessProfileResponse[];
  }> {
    const users = await firstValueFrom(
      this.http.get<UserResponse[]>(`${this.apiBaseUrl}/users`)
    );

    const user = users.find(
      (item) =>
        item.email.trim().toLowerCase() === resource.email.trim().toLowerCase() &&
        item.password === resource.password
    );

    if (!user) {
      throw new Error('Invalid credentials.');
    }

    const accessProfiles = await this.getDefaultAccessProfiles();

    return {
      user,
      accessProfiles,
    };
  }

  async signUp(resource: SignUpResource): Promise<{
    user: UserResponse;
    accessProfiles: AccessProfileResponse[];
  }> {
    const users = await firstValueFrom(
      this.http.get<UserResponse[]>(`${this.apiBaseUrl}/users`)
    );

    const emailAlreadyExists = users.some(
      (item) =>
        item.email.trim().toLowerCase() === resource.email.trim().toLowerCase()
    );

    if (emailAlreadyExists) {
      throw new Error('Email already exists.');
    }

    const createdUser = await firstValueFrom(
      this.http.post<UserResponse>(`${this.apiBaseUrl}/users`, {
        id: Date.now(),
        fullName: resource.fullName,
        email: resource.email,
        password: resource.password,
        status: 'ACTIVE',
      })
    );

    const accessProfiles = await this.getDefaultAccessProfiles();

    return {
      user: createdUser,
      accessProfiles,
    };
  }

  async restoreSession(email: string): Promise<{
    user: UserResponse;
    accessProfiles: AccessProfileResponse[];
  } | null> {
    const users = await firstValueFrom(
      this.http.get<UserResponse[]>(`${this.apiBaseUrl}/users`)
    );

    const user = users.find(
      (item) => item.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) return null;

    const accessProfiles = await this.getDefaultAccessProfiles();

    return {
      user,
      accessProfiles,
    };
  }

  private async getDefaultAccessProfiles(): Promise<AccessProfileResponse[]> {
    const profiles = await firstValueFrom(
      this.http.get<AccessProfileResponse[]>(`${this.apiBaseUrl}/accessProfiles`)
    );

    return profiles.filter((profile) => profile.name === 'OWNER');
  }
}
