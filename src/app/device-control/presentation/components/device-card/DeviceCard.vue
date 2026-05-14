<template>
  <article class="device-card">
    <div>
      <p class="device-type">{{ device.type }}</p>
      <h3>{{ device.name }}</h3>
      <p>{{ device.room }} · {{ device.powerWatts }}W</p>
    </div>

    <div class="device-actions">
      <span
        class="status"
        :class="{ active: device.status === 'ON' }"
      >
        {{ device.status }}
      </span>

      <button type="button" class="ghost-btn" @click="$emit('toggle', device.id)">
        {{ device.status === 'ON' ? t('devices.turnOff') : t('devices.turnOn') }}
      </button>

      <button type="button" class="danger-btn" @click="$emit('remove', device.id)">
        {{ t('devices.remove') }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Device } from '../../../domain/model/device.entity';

defineProps<{
  device: Device;
}>();

defineEmits<{
  toggle: [deviceId: number];
  remove: [deviceId: number];
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.device-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 22px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

.device-type {
  margin: 0 0 8px;
  color: var(--accent-main);
  font-weight: 700;
  font-size: 0.8rem;
}

h3 {
  margin: 0 0 8px;
  color: var(--text-main);
}

p {
  color: var(--text-muted);
  margin-top: 0;
  margin-bottom: 0;
}

.device-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 143, 143, 0.16);
  color: #ff7a7a;
  font-weight: 800;
}

.status.active {
  background: rgba(34, 197, 94, 0.16);
  color: #16a34a;
}

.ghost-btn,
.danger-btn {
  border: none;
  padding: 11px 14px;
  border-radius: 12px;
  font-weight: 800;
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

@media (max-width: 720px) {
  .device-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .device-actions {
    flex-wrap: wrap;
  }
}
</style>