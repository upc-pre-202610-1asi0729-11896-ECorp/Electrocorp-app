import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ThemeService } from '../services/theme.service';
import { STORAGE_KEYS } from '../../infrastructure/constants';

export type AppLanguage = 'es' | 'en' | 'pt';

export const useUiStore = defineStore('ui', () => {
    const themeService = new ThemeService();

    const language = ref<AppLanguage>(
        (localStorage.getItem(STORAGE_KEYS.language) as AppLanguage) ?? 'es'
    );

    const darkMode = ref(
        localStorage.getItem(STORAGE_KEYS.darkMode) !== 'false'
    );

    function setLanguage(value: AppLanguage) {
        language.value = value;
        localStorage.setItem(STORAGE_KEYS.language, value);
    }

    function toggleDarkMode() {
        darkMode.value = !darkMode.value;
        localStorage.setItem(STORAGE_KEYS.darkMode, String(darkMode.value));
        themeService.applyTheme(darkMode.value);
    }

    function restoreUiPreferences() {
        themeService.applyTheme(darkMode.value);
    }

    return {
        language,
        darkMode,
        setLanguage,
        toggleDarkMode,
        restoreUiPreferences,
    };
});