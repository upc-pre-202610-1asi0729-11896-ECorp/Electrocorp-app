<template>
  <section class="chart-card">
    <div class="chart-header">
      <div>
        <p class="eyebrow">{{ t('energy.chartEyebrow') }}</p>
        <h2>{{ t('energy.chartTitle') }}</h2>
      </div>
    </div>

    <div class="bars">
      <article
        v-for="reading in readings"
        :key="reading.id"
        class="bar-item"
      >
        <div class="bar-wrapper">
          <div
            class="bar"
            :style="{ height: `${getBarHeight(reading.watts)}%` }"
          ></div>
        </div>

        <span class="watts">{{ reading.watts }}W</span>
        <small>{{ reading.recordedAt }}</small>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { EnergyReading } from '../../../domain/model/energy-reading.entity';

const props = defineProps<{
  readings: EnergyReading[];
}>();

const { t } = useI18n();

const maxWatts = computed(() => {
  if (props.readings.length === 0) return 1;

  return Math.max(...props.readings.map((reading) => reading.watts));
});

function getBarHeight(watts: number): number {
  return Math.max(12, Math.round((watts / maxWatts.value) * 100));
}
</script>

<style scoped lang="scss">
.chart-card {
  padding: 28px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

.chart-header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--accent-main);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h2 {
  margin: 0;
  color: var(--text-main);
}

.bars {
  height: 260px;
  display: flex;
  align-items: end;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.bar-item {
  min-width: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
}

.bar-wrapper {
  width: 52px;
  flex: 1;
  display: flex;
  align-items: end;
  border-radius: 999px;
  background: var(--surface-strong);
  overflow: hidden;
  border: 1px solid var(--border-soft);
}

.bar {
  width: 100%;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, var(--accent-main), #8dffc3);
}

.watts {
  font-weight: 800;
  color: var(--text-main);
}

small {
  color: var(--text-soft);
}
</style>