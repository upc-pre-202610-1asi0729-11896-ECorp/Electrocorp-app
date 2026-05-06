<template>
  <section class="devices-view">
    <div class="hero-card">
      <div>
        <p class="eyebrow">{{ t('devices.eyebrow') }}</p>
        <h1>{{ t('devices.title') }}</h1>
        <p class="subtitle">{{ t('devices.subtitle') }}</p>
      </div>

      <div class="summary-grid">
        <article class="summary-card">
          <span>{{ t('devices.totalDevices') }}</span>
          <strong>{{ deviceStore.totalDevices }}</strong>
        </article>

        <article class="summary-card">
          <span>{{ t('devices.activeDevices') }}</span>
          <strong>{{ deviceStore.activeDevices }}</strong>
        </article>

        <article class="summary-card">
          <span>{{ t('devices.currentWatts') }}</span>
          <strong>{{ deviceStore.totalCurrentWatts }}W</strong>
        </article>
      </div>
    </div>

    <p v-if="deviceStore.error" class="error-message">
      {{ deviceStore.error }}
    </p>

    <div class="content-grid">
      <form class="device-form" @submit.prevent="handleSubmit">
        <h2>{{ t('devices.addDevice') }}</h2>

        <div class="field">
          <label>{{ t('devices.name') }}</label>
          <input v-model="name" type="text" placeholder="Smart plug" />
        </div>

        <div class="field">
          <label>{{ t('devices.room') }}</label>
          <input v-model="room" type="text" placeholder="Living room" />
        </div>

        <div class="field">
          <label>{{ t('devices.type') }}</label>
          <select v-model="type">
            <option value="SMART_PLUG">Smart Plug</option>
            <option value="SMART_SWITCH">Smart Switch</option>
            <option value="LIGHT">Light</option>
          </select>
        </div>

        <div class="field">
          <label>{{ t('devices.powerWatts') }}</label>
          <input v-model.number="powerWatts" type="number" min="1" />
        </div>

        <button type="submit" class="primary-btn" :disabled="deviceStore.loading">
          {{ deviceStore.loading ? t('devices.saving') : t('devices.create') }}
        </button>
      </form>

      <DeviceList
        :devices="deviceStore.devices"
        @toggle="deviceStore.toggleDevice"
        @remove="deviceStore.removeDevice"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDeviceControlStore } from '../../../application/stores/device-control.store';
import type { DeviceType } from '../../../domain/model/device.entity';
import DeviceList from '../../components/device-list/DeviceList.vue';

const { t } = useI18n();
const deviceStore = useDeviceControlStore();

const name = ref('');
const room = ref('');
const type = ref<DeviceType>('SMART_PLUG');
const powerWatts = ref(100);

onMounted(() => {
  deviceStore.loadDevices();
});

async function handleSubmit() {
  if (!name.value.trim() || !room.value.trim() || powerWatts.value <= 0) return;

  await deviceStore.addDevice({
    name: name.value,
    room: room.value,
    type: type.value,
    powerWatts: powerWatts.value,
  });

  name.value = '';
  room.value = '';
  type.value = 'SMART_PLUG';
  powerWatts.value = 100;
}
</script>

<style scoped lang="scss">
.devices-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card,
.device-form {
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.hero-card {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--accent-main);
  font-weight: 700;
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
  max-width: 680px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 12px;
  min-width: 420px;
}

.summary-card {
  padding: 18px;
  border-radius: 18px;
  background: var(--surface-strong);
  border: 1px solid var(--border-soft);
}

.summary-card span {
  display: block;
  color: var(--text-soft);
  font-size: 0.86rem;
  margin-bottom: 8px;
}

.summary-card strong {
  font-size: 1.7rem;
  color: var(--text-main);
}

.error-message {
  margin: 0;
  color: var(--danger-text);
  font-weight: 700;
}

.content-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
}

.device-form {
  padding: 24px;
  height: fit-content;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

label {
  color: var(--text-muted);
  font-weight: 600;
}

input,
select {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: var(--surface-strong);
  color: var(--text-main);
}

.primary-btn {
  width: 100%;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--accent-main);
  color: var(--accent-contrast);
  font-weight: 800;
  cursor: pointer;
}

.primary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 920px) {
  .hero-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-grid,
  .content-grid {
    grid-template-columns: 1fr;
    min-width: 0;
    width: 100%;
  }
}
</style>