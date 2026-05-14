import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService, TranslationObject } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import {
  AppLanguage,
  UiPreferencesService,
} from './ui-preferences.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationFacadeService {
  private readonly loadedLanguages = new Set<AppLanguage>();

  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly uiPreferencesService: UiPreferencesService
  ) {}

  async initialize(): Promise<void> {
    this.translateService.addLangs(['es', 'en', 'pt']);
    this.translateService.setFallbackLang('es');

    const savedLanguage = this.uiPreferencesService.language();
    await this.changeLanguage(savedLanguage);
  }

  async changeLanguage(language: AppLanguage): Promise<void> {
    try {
      if (!this.loadedLanguages.has(language)) {
        const translations = await firstValueFrom(
          this.http.get<TranslationObject>(
            `/assets/i18n/${language}.json?v=${Date.now()}`
          )
        );

        this.translateService.setTranslation(language, translations, true);
        this.loadedLanguages.add(language);
      }

      this.translateService.use(language);
      this.uiPreferencesService.setLanguage(language);

      console.log(`Language changed to: ${language}`);
    } catch (error) {
      console.error(`Could not load language: ${language}`, error);
    }
  }
}
