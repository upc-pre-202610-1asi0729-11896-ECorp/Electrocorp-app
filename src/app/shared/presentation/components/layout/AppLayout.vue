<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">⚡ {{ t('app.name') }}</div>

      <nav v-if="iamStore.isAuthenticated" class="nav">
        <RouterLink to="/home" class="nav-link">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/about" class="nav-link">{{ t('nav.about') }}</RouterLink>
        <RouterLink to="/device-control/devices" class="nav-link">{{ t('nav.devices') }}</RouterLink>
        <RouterLink to="/device-control/routines" class="nav-link">{{ t('nav.routines') }}</RouterLink>
        <RouterLink to="/energy-monitoring/dashboard" class="nav-link">{{ t('nav.energy') }}</RouterLink>
        <RouterLink to="/energy-monitoring/history" class="nav-link">{{ t('nav.history') }}</RouterLink>
        <RouterLink to="/billing/plans" class="nav-link">{{ t('nav.billing') }}</RouterLink>
        <RouterLink to="/notifications/alerts" class="nav-link">{{ t('nav.alerts') }}</RouterLink>
      </nav>

      <div class="actions">
        <button
          class="lang-btn"
          :class="{ active: locale === 'es' }"
          type="button"
          @click="switchLanguage('es')"
        >
          ES
        </button>

        <button
          class="lang-btn"
          :class="{ active: locale === 'en' }"
          type="button"
          @click="switchLanguage('en')"
        >
          EN
        </button>

        <button class="theme-btn" type="button" @click="uiStore.toggleDarkMode">
          {{ uiStore.darkMode ? '☀️' : '🌙' }}
        </button>

        <button
          v-if="iamStore.isAuthenticated"
          class="logout-btn"
          type="button"
          @click="handleSignOut"
        >
          {{ t('nav.logout') }}
        </button>
      </div>
    </header>

    <main class="app-content">
      <RouterView />
    </main>

    <FooterContent />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '../../../application/stores/ui.store';
import { useIamStore } from '../../../../iam/application/stores/iam.store';
import FooterContent from '../footer-content/FooterContent.vue';

const { t, locale } = useI18n();
const uiStore = useUiStore();
const iamStore = useIamStore();
const router = useRouter();

function switchLanguage(language: 'es' | 'en') {
  uiStore.setLanguage(language);
  locale.value = language;
}

async function handleSignOut() {
  await iamStore.signOut();
  router.push('/iam/login');
}
</script>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at top, rgba(66, 194, 255, 0.18), transparent 35%),
    linear-gradient(135deg, var(--app-bg-primary) 0%, var(--app-bg-secondary) 55%, var(--app-bg-tertiary) 100%);
  color: var(--text-main);
  transition: background 0.25s ease, color 0.25s ease;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  border-bottom: 1px solid var(--border-soft);
  backdrop-filter: blur(8px);
  gap: 20px;
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-main);
  white-space: nowrap;
}

.nav {
  display: flex;
  gap: 14px;
  flex: 1;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 12px;
  transition: 0.2s ease;
}

.nav-link:hover,
.router-link-active {
  background: var(--surface-hover);
  color: var(--text-main);
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.lang-btn,
.theme-btn,
.logout-btn {
  border: none;
  padding: 8px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 800;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.lang-btn,
.theme-btn {
  background: var(--surface-main);
  color: var(--text-main);
  border: 1px solid var(--border-soft);
}

.lang-btn:hover,
.theme-btn:hover {
  background: var(--surface-hover);
  transform: translateY(-1px);
}

.lang-btn.active {
  background: var(--accent-main);
  color: var(--accent-contrast);
  border-color: var(--accent-main);
  box-shadow: 0 0 18px rgba(66, 194, 255, 0.28);
}

.lang-btn.active:hover {
  background: var(--accent-main);
  color: var(--accent-contrast);
}

.logout-btn {
  background: var(--danger-bg);
  color: var(--danger-text);
}

.lang-btn:hover,
.theme-btn:hover {
  background: var(--surface-hover);
}

.logout-btn:hover {
  filter: brightness(1.08);
}

.app-content {
  flex: 1;
  padding: 32px;
}

@media (max-width: 860px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav {
    justify-content: flex-start;
  }

  .app-content {
    padding: 20px;
  }
}
</style>