<template>
  <section class="history-view">
    <div class="hero-card">
      <div>
        <p class="eyebrow">{{ t('energyHistory.eyebrow') }}</p>
        <h1>{{ t('energyHistory.title') }}</h1>
        <p class="subtitle">{{ t('energyHistory.subtitle') }}</p>
      </div>

      <button class="export-btn" type="button" @click="energyStore.exportCsv">
        {{ t('energy.exportCsv') }}
      </button>
    </div>

    <p v-if="energyStore.error" class="error-message">
      {{ energyStore.error }}
    </p>

    <section class="recommendation-card">
      <p class="eyebrow">{{ t('energyHistory.recommendation') }}</p>
      <h2>{{ energyStore.recommendation }}</h2>
    </section>

    <section class="table-card">
      <div class="table-header">
        <h2>{{ t('energyHistory.tableTitle') }}</h2>
        <span>{{ energyStore.readings.length }} {{ t('energyHistory.records') }}</span>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{{ t('energyHistory.device') }}</th>
              <th>{{ t('energyHistory.watts') }}</th>
              <th>{{ t('energyHistory.date') }}</th>
              <th>{{ t('energyHistory.status') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="reading in energyStore.readings" :key="reading.id">
              <td>{{ reading.deviceName }}</td>
              <td>{{ reading.watts }}W</td>
              <td>{{ reading.recordedAt }}</td>
              <td>
                <span
                  class="status-badge"
                  :class="{ danger: reading.watts >= 120 }"
                >
                  {{ reading.watts >= 120 ? t('energyHistory.high') : t('energyHistory.normal') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEnergyMonitoringStore } from '../../../application/stores/energy-monitoring.store';

const { t } = useI18n();
const energyStore = useEnergyMonitoringStore();

onMounted(() => {
  energyStore.loadReadings();
});
</script>

<style scoped lang="scss">
.history-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card,
.recommendation-card,
.table-card {
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
h2,
p {
  margin-top: 0;
}

h1,
h2 {
  color: var(--text-main);
}

h1 {
  margin-bottom: 12px;
  font-size: 2.2rem;
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

.recommendation-card {
  padding: 28px;
}

.recommendation-card h2 {
  margin-bottom: 0;
  color: var(--text-main);
  line-height: 1.4;
}

.table-card {
  padding: 28px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 18px;
}

.table-header h2 {
  margin-bottom: 0;
}

.table-header span {
  color: var(--text-soft);
  font-weight: 700;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid var(--border-soft);
}

th {
  color: var(--accent-main);
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

td {
  color: var(--text-muted);
}

.status-badge {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.16);
  color: #16a34a;
  font-weight: 800;
}

.status-badge.danger {
  background: rgba(255, 99, 99, 0.14);
  color: var(--danger-text);
}

.export-btn {
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--accent-main);
  color: var(--accent-contrast);
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
}

@media (max-width: 760px) {
  .hero-card,
  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>