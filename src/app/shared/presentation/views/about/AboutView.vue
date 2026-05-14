<template>
  <section class="about-view">
    <div class="card">
      <p class="eyebrow">{{ t('about.eyebrow') }}</p>
      <h1>{{ t('about.title') }}</h1>
      <p>{{ t('about.content') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped lang="scss">
.about-view {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.card {
  width: 100%;
  max-width: 820px;
  padding: 32px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--accent-main);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0 0 12px;
  font-size: 2rem;
  color: var(--text-main);
}

p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.6;
}
</style>