import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  applyTheme(isDarkMode: boolean): void {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      return;
    }

    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  }
}
