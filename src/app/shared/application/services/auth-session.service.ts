import { computed, inject, Injectable, signal } from '@angular/core';

import { STORAGE_KEYS } from '../../infrastructure/constants/storage-keys';
import { LocalStorageService } from '../../infrastructure/storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthSessionService {
  private readonly localStorage = inject(LocalStorageService);

  private readonly authenticatedSignal = signal<boolean>(
    this.localStorage.getItem(STORAGE_KEYS.auth) === 'true'
  );

  private readonly userIdSignal = signal<number | null>(
    this.parseUserId(this.localStorage.getItem(STORAGE_KEYS.userId))
  );

  private readonly userEmailSignal = signal<string | null>(
    this.localStorage.getItem(STORAGE_KEYS.userEmail)
  );

  private readonly userNameSignal = signal<string | null>(
    this.localStorage.getItem(STORAGE_KEYS.userName)
  );

  readonly isAuthenticated = computed(() => this.authenticatedSignal());
  readonly userId = computed(() => this.userIdSignal());
  readonly userEmail = computed(() => this.userEmailSignal());
  readonly userName = computed(() => this.userNameSignal());

  startSession(payload: {
    id: number;
    email: string;
    fullName: string;
  }): void {
    this.localStorage.setItem(STORAGE_KEYS.auth, 'true');
    this.localStorage.setItem(STORAGE_KEYS.userId, String(payload.id));
    this.localStorage.setItem(STORAGE_KEYS.userEmail, payload.email);
    this.localStorage.setItem(STORAGE_KEYS.userName, payload.fullName);

    this.authenticatedSignal.set(true);
    this.userIdSignal.set(payload.id);
    this.userEmailSignal.set(payload.email);
    this.userNameSignal.set(payload.fullName);
  }

  closeSession(): void {
    this.localStorage.removeItem(STORAGE_KEYS.auth);
    this.localStorage.removeItem(STORAGE_KEYS.userId);
    this.localStorage.removeItem(STORAGE_KEYS.userEmail);
    this.localStorage.removeItem(STORAGE_KEYS.userName);

    this.authenticatedSignal.set(false);
    this.userIdSignal.set(null);
    this.userEmailSignal.set(null);
    this.userNameSignal.set(null);
  }

  restoreSession(): void {
    const auth = this.localStorage.getItem(STORAGE_KEYS.auth);
    const userId = this.localStorage.getItem(STORAGE_KEYS.userId);
    const email = this.localStorage.getItem(STORAGE_KEYS.userEmail);
    const name = this.localStorage.getItem(STORAGE_KEYS.userName);

    this.authenticatedSignal.set(auth === 'true');
    this.userIdSignal.set(this.parseUserId(userId));
    this.userEmailSignal.set(email);
    this.userNameSignal.set(name);
  }

  private parseUserId(value: string | null): number | null {
    if (!value) return null;

    const parsed = Number(value);

    return Number.isNaN(parsed) ? null : parsed;
  }
}
