<template>
  <section class="not-found-view">
    <div class="card">
      <h1>{{ t('notFound.title') }}</h1>
      <p>{{ t('notFound.content') }}</p>

      <RouterLink to="/home" class="go-home">
        {{ t('notFound.goHome') }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped lang="scss">
.not-found-view {
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
}

h1 {
  margin: 0 0 12px;
  font-size: 2rem;
  color: var(--text-main);
}

p {
  margin: 0 0 20px;
  color: var(--text-muted);
  line-height: 1.6;
}

.go-home {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 12px;
  background: var(--accent-main);
  color: var(--accent-contrast);
  font-weight: 700;
  text-decoration: none;
}
</style>