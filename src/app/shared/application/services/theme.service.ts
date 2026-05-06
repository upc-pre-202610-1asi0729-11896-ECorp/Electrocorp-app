export class ThemeService {
    applyTheme(isDarkMode: boolean): void {
        const theme = isDarkMode ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);

        document.documentElement.classList.toggle('dark-theme', isDarkMode);
        document.documentElement.classList.toggle('light-theme', !isDarkMode);
    }
}