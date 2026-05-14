<template>
  <div class="alert-list">
    <article
      v-for="alert in alerts"
      :key="alert.id"
      class="alert-card"
      :class="[
        alert.level.toLowerCase(),
        { unread: !alert.read }
      ]"
    >
      <div>
        <div class="alert-heading">
          <span class="level">{{ alert.level }}</span>
          <small>{{ alert.createdAt }}</small>
        </div>

        <h3>{{ alert.title }}</h3>
        <p>{{ alert.message }}</p>
      </div>

      <button
        v-if="!alert.read"
        type="button"
        class="ghost-btn"
        @click="$emit('mark-read', alert.id)"
      >
        {{ t('notifications.markRead') }}
      </button>
    </article>

    <article v-if="alerts.length === 0" class="empty-state">
      <h3>{{ t('notifications.emptyTitle') }}</h3>
      <p>{{ t('notifications.emptyContent') }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Alert } from '../../../domain/model/alert.entity';

defineProps<{
  alerts: Alert[];
}>();

defineEmits<{
  'mark-read': [alertId: number];
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.alert-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.alert-card,
.empty-state {
  padding: 22px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

.alert-card {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}

.alert-card.unread {
  border-color: rgba(34, 197, 94, 0.35);
}

.alert-card.critical {
  border-color: rgba(255, 99, 99, 0.45);
}

.alert-card.warning {
  border-color: rgba(245, 158, 11, 0.45);
}

.alert-heading {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
}

.level {
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--surface-hover);
  color: var(--accent-main);
  font-weight: 900;
  font-size: 0.75rem;
}

small {
  color: var(--text-soft);
}

h3 {
  margin: 0 0 8px;
  color: var(--text-main);
}

p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.5;
}

.ghost-btn {
  border: none;
  padding: 11px 14px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
  background: var(--surface-hover);
  color: var(--text-main);
}

.empty-state {
  color: var(--text-muted);
}

.empty-state h3 {
  margin-top: 0;
  color: var(--text-main);
}

@media (max-width: 760px) {
  .alert-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>