import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ThemeService } from '../services/theme.service';
import { STORAGE_KEYS } from '../../infrastructure/constants';

export const useUiStore = defineStore('ui', () => {
    const themeService = new ThemeService();

    const language = ref<'es' | 'en'>(
        (localStorage.getItem(STORAGE_KEYS.language) as 'es' | 'en') ?? 'es'
    );

    const darkMode = ref(
        localStorage.getItem(STORAGE_KEYS.darkMode) !== 'false'
    );

    function setLanguage(value: 'es' | 'en') {
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