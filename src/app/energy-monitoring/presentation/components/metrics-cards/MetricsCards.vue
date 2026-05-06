<template>
  <div class="metrics-grid">
    <article class="metric-card">
      <span>{{ t('energy.totalWatts') }}</span>
      <strong>{{ totalWatts }}W</strong>
    </article>

    <article class="metric-card">
      <span>{{ t('energy.averageWatts') }}</span>
      <strong>{{ averageWatts }}W</strong>
    </article>

    <article class="metric-card">
      <span>{{ t('energy.highestReading') }}</span>
      <strong>{{ highestReading }}W</strong>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
  totalWatts: number;
  averageWatts: number;
  highestReading: number;
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 16px;
}

.metric-card {
  padding: 22px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

.metric-card span {
  display: block;
  color: var(--text-soft);
  margin-bottom: 8px;
}

.metric-card strong {
  font-size: 1.8rem;
  color: var(--text-main);
}

@media (max-width: 760px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>