<template>
  <section class="routines-view">
    <div class="hero-card">
      <div>
        <p class="eyebrow">{{ t('routines.eyebrow') }}</p>
        <h1>{{ t('routines.pageTitle') }}</h1>
        <p class="subtitle">{{ t('routines.subtitle') }}</p>
      </div>

      <div class="summary-grid">
        <article class="summary-card">
          <span>{{ t('routines.totalRoutines') }}</span>
          <strong>{{ deviceStore.totalRoutines }}</strong>
        </article>

        <article class="summary-card">
          <span>{{ t('routines.enabledRoutines') }}</span>
          <strong>{{ deviceStore.enabledRoutines }}</strong>
        </article>
      </div>
    </div>

    <p v-if="deviceStore.error" class="error-message">
      {{ deviceStore.error }}
    </p>

    <div class="content-grid">
      <form class="routine-form" @submit.prevent="handleSubmit">
        <h2>{{ t('routines.createRoutine') }}</h2>

        <div class="field">
          <label>{{ t('routines.name') }}</label>
          <input v-model="name" type="text" placeholder="Turn off bedroom light" />
        </div>

        <div class="field">
          <label>{{ t('routines.device') }}</label>
          <select v-model.number="deviceId">
            <option disabled :value="0">
              {{ t('routines.selectDevice') }}
            </option>

            <option
              v-for="device in deviceStore.devices"
              :key="device.id"
              :value="device.id"
            >
              {{ device.name }}
            </option>
          </select>
        </div>

        <div class="field">
          <label>{{ t('routines.action') }}</label>
          <select v-model="action">
            <option value="TURN_ON">{{ t('routines.turnOn') }}</option>
            <option value="TURN_OFF">{{ t('routines.turnOff') }}</option>
          </select>
        </div>

        <div class="field">
          <label>{{ t('routines.scheduledTime') }}</label>
          <input v-model="scheduledTime" type="time" />
        </div>

        <button type="submit" class="primary-btn">
          {{ t('routines.create') }}
        </button>
      </form>

      <RoutineList
        :routines="deviceStore.routines"
        :get-device-name="deviceStore.getDeviceName"
        @toggle="deviceStore.toggleRoutine"
        @remove="deviceStore.removeRoutine"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDeviceControlStore } from '../../../application/stores/device-control.store';
import type { RoutineAction } from '../../../domain/model/routine.entity';
import RoutineList from '../../components/routine-list/RoutineList.vue';

const { t } = useI18n();
const deviceStore = useDeviceControlStore();

const name = ref('');
const deviceId = ref(0);
const action = ref<RoutineAction>('TURN_OFF');
const scheduledTime = ref('23:00');

onMounted(() => {
  deviceStore.loadDevices();
});

function handleSubmit() {
  if (!name.value.trim() || deviceId.value === 0 || !scheduledTime.value) return;

  deviceStore.addRoutine({
    name: name.value,
    deviceId: deviceId.value,
    action: action.value,
    scheduledTime: scheduledTime.value,
  });

  if (!deviceStore.error) {
    name.value = '';
    deviceId.value = 0;
    action.value = 'TURN_OFF';
    scheduledTime.value = '23:00';
  }
}
</script>

<style scoped lang="scss">
.routines-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card,
.routine-form {
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
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
  font-weight: 900;
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
  grid-template-columns: repeat(2, minmax(130px, 1fr));
  gap: 12px;
  min-width: 300px;
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

.routine-form {
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
  font-weight: 700;
}

input,
select {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: var(--surface-strong);
  color: var(--text-main);
  font-family: inherit;
}

.primary-btn {
  width: 100%;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--accent-main);
  color: var(--accent-contrast);
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
}

@media (max-width: 920px) {
  .hero-card {
    flex-direction: column;
  }

  .summary-grid,
  .content-grid {
    grid-template-columns: 1fr;
    min-width: 0;
    width: 100%;
  }
}
</style>