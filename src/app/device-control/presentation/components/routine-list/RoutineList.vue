<template>
  <section class="routine-list">
    <article
      v-for="routine in routines"
      :key="routine.id"
      class="routine-card"
    >
      <div>
        <p class="routine-action">{{ routine.action }}</p>
        <h3>{{ routine.name }}</h3>
        <p>
          {{ getDeviceName(routine.deviceId) }} · {{ routine.scheduledTime }}
        </p>
      </div>

      <div class="routine-actions">
        <span :class="['badge', { disabled: !routine.enabled }]">
          {{ routine.enabled ? t('routines.enabled') : t('routines.disabled') }}
        </span>

        <button type="button" class="ghost-btn" @click="$emit('toggle', routine.id)">
          {{ routine.enabled ? t('routines.disable') : t('routines.enable') }}
        </button>

        <button type="button" class="danger-btn" @click="$emit('remove', routine.id)">
          {{ t('routines.remove') }}
        </button>
      </div>
    </article>

    <article v-if="routines.length === 0" class="empty-state">
      <h3>{{ t('routines.emptyTitle') }}</h3>
      <p>{{ t('routines.emptyContent') }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Routine } from '../../../domain/model/routine.entity';

defineProps<{
  routines: Routine[];
  getDeviceName: (deviceId: number) => string;
}>();

defineEmits<{
  toggle: [routineId: number];
  remove: [routineId: number];
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.routine-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.routine-card,
.empty-state {
  padding: 22px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

.routine-card {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}

.routine-action {
  margin: 0 0 8px;
  color: var(--accent-main);
  font-weight: 900;
  font-size: 0.8rem;
}

h3 {
  margin: 0 0 8px;
  color: var(--text-main);
}

p {
  margin: 0;
  color: var(--text-muted);
}

.routine-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.16);
  color: #16a34a;
  font-weight: 900;
}

.badge.disabled {
  background: rgba(255, 99, 99, 0.14);
  color: var(--danger-text);
}

.ghost-btn,
.danger-btn {
  border: none;
  padding: 11px 14px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
}

.ghost-btn {
  background: var(--surface-hover);
  color: var(--text-main);
}

.danger-btn {
  background: var(--danger-bg);
  color: var(--danger-text);
}

.empty-state h3 {
  margin-top: 0;
}

@media (max-width: 760px) {
  .routine-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>