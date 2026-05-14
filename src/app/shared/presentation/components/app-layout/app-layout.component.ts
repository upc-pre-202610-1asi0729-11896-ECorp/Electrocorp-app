import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import {
  AppLanguage,
  UiPreferencesService,
} from '../../../application/services/ui-preferences.service';
import { TranslationFacadeService } from '../../../application/services/translation.service';
import { AuthSessionService } from '../../../application/services/auth-session.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    FooterComponent,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent implements OnInit {
  constructor(
    readonly uiPreferences: UiPreferencesService,
    readonly authSession: AuthSessionService,
    private readonly translationFacade: TranslationFacadeService,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.uiPreferences.restorePreferences();
    this.authSession.restoreSession();
    await this.translationFacade.initialize();
  }

  async switchLanguage(language: AppLanguage): Promise<void> {
    await this.translationFacade.changeLanguage(language);
  }

  toggleTheme(): void {
    this.uiPreferences.toggleTheme();
  }

  async signOut(): Promise<void> {
    this.authSession.closeSession();
    await this.router.navigate(['/iam/login']);
  }
}
