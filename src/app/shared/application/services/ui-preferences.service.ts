import { computed, inject, Injectable, signal } from '@angular/core';

import { STORAGE_KEYS } from '../../infrastructure/constants/storage-keys';
import { LocalStorageService } from '../../infrastructure/storage/local-storage.service';
import { ThemeService } from './theme.service';

export type AppLanguage = 'es' | 'en' | 'pt';

@Injectable({
  providedIn: 'root',
})
export class UiPreferencesService {
  private readonly localStorage = inject(LocalStorageService);
  private readonly themeService = inject(ThemeService);

  private readonly languageSignal = signal<AppLanguage>(
    (this.localStorage.getItem(STORAGE_KEYS.language) as AppLanguage) ?? 'es'
  );

  private readonly darkModeSignal = signal<boolean>(
    this.localStorage.getItem(STORAGE_KEYS.darkMode) !== 'false'
  );

  readonly language = computed(() => this.languageSignal());
  readonly darkMode = computed(() => this.darkModeSignal());

  setLanguage(language: AppLanguage): void {
    this.languageSignal.set(language);
    this.localStorage.setItem(STORAGE_KEYS.language, language);
  }

  toggleTheme(): void {
    const nextValue = !this.darkModeSignal();

    this.darkModeSignal.set(nextValue);
    this.localStorage.setItem(STORAGE_KEYS.darkMode, String(nextValue));
    this.themeService.applyTheme(nextValue);
  }

  restorePreferences(): void {
    this.themeService.applyTheme(this.darkModeSignal());
  }
}
