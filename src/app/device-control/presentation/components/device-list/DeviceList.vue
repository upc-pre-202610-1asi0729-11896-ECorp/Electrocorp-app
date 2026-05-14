<template>
  <div class="devices-list">
    <DeviceCard
      v-for="device in devices"
      :key="device.id"
      :device="device"
      @toggle="$emit('toggle', $event)"
      @remove="$emit('remove', $event)"
    />

    <article v-if="devices.length === 0" class="empty-state">
      <h3>{{ t('devices.emptyTitle') }}</h3>
      <p>{{ t('devices.emptyContent') }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Device } from '../../../domain/model/device.entity';
import DeviceCard from '../device-card/DeviceCard.vue';

defineProps<{
  devices: Device[];
}>();

defineEmits<{
  toggle: [deviceId: number];
  remove: [deviceId: number];
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.devices-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  padding: 28px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px dashed var(--border-accent);
  color: var(--text-muted);
}

.empty-state h3 {
  margin: 0 0 8px;
  color: var(--text-main);
}

.empty-state p {
  margin: 0;
  color: var(--text-muted);
}
</style>