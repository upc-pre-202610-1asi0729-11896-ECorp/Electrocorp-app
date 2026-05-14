<template>
  <section class="energy-view">
    <div class="hero-card">
      <div>
        <p class="eyebrow">{{ t('energy.eyebrow') }}</p>
        <h1>{{ t('energy.title') }}</h1>
        <p class="subtitle">{{ t('energy.subtitle') }}</p>
      </div>

      <button class="export-btn" type="button" @click="energyStore.exportCsv">
        {{ t('energy.exportCsv') }}
      </button>
    </div>

    <p v-if="energyStore.error" class="error-message">
      {{ energyStore.error }}
    </p>

    <MetricsCards
      :total-watts="energyStore.totalWatts"
      :average-watts="energyStore.averageWatts"
      :highest-reading="energyStore.highestReading"
    />

    <form class="filter-card" @submit.prevent="handleFilter">
      <div class="field">
        <label>{{ t('energy.startDate') }}</label>
        <input v-model="startDate" type="date" />
      </div>

      <div class="field">
        <label>{{ t('energy.endDate') }}</label>
        <input v-model="endDate" type="date" />
      </div>

      <button class="primary-btn" type="submit">
        {{ t('energy.filter') }}
      </button>

      <button class="ghost-btn" type="button" @click="handleReset">
        {{ t('energy.reset') }}
      </button>
    </form>

    <UsageChart :readings="energyStore.readings" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEnergyMonitoringStore } from '../../../application/stores/energy-monitoring.store';
import MetricsCards from '../../components/metrics-cards/MetricsCards.vue';
import UsageChart from '../../components/usage-chart/UsageChart.vue';

const { t } = useI18n();
const energyStore = useEnergyMonitoringStore();

const startDate = ref('2026-05-01');
const endDate = ref('2026-05-05');

onMounted(() => {
  energyStore.loadReadings();
});

function handleFilter() {
  if (!startDate.value || !endDate.value) return;

  energyStore.filterReadings({
    startDate: startDate.value,
    endDate: endDate.value,
  });
}

function handleReset() {
  startDate.value = '2026-05-01';
  endDate.value = '2026-05-05';
  energyStore.loadReadings();
}
</script>

<style scoped lang="scss">
.energy-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card,
.filter-card {
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

.hero-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 32px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--accent-main);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 12px;
  font-size: 2.2rem;
  color: var(--text-main);
}

.subtitle {
  max-width: 720px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 0;
}

.error-message {
  margin: 0;
  color: var(--danger-text);
  font-weight: 700;
}

.filter-card {
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: end;
  gap: 16px;
  padding: 24px;
  width: fit-content;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: var(--text-muted);
  font-weight: 700;
}

input {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: var(--surface-strong);
  color: var(--text-main);
  font-family: inherit;
}

.primary-btn,
.ghost-btn,
.export-btn {
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
}

.primary-btn,
.export-btn {
  background: var(--accent-main);
  color: var(--accent-contrast);
}

.ghost-btn {
  background: var(--surface-hover);
  color: var(--text-main);
}

@media (max-width: 920px) {
  .hero-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-card {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>