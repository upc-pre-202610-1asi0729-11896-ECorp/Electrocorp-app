<template>
  <section class="alerts-view">
    <div class="hero-card">
      <div>
        <p class="eyebrow">{{ t('notifications.eyebrow') }}</p>
        <h1>{{ t('notifications.title') }}</h1>
        <p class="subtitle">{{ t('notifications.subtitle') }}</p>
      </div>

      <div class="counter-card">
        <span>{{ t('notifications.unread') }}</span>
        <strong>{{ notificationsStore.unreadCount }}</strong>
      </div>
    </div>

    <p v-if="notificationsStore.error" class="error-message">
      {{ notificationsStore.error }}
    </p>

    <form class="alert-form" @submit.prevent="handleSubmit">
      <div class="field">
        <label>{{ t('notifications.alertTitle') }}</label>
        <input v-model="title" type="text" placeholder="High consumption detected" />
      </div>

      <div class="field">
        <label>{{ t('notifications.message') }}</label>
        <input v-model="message" type="text" placeholder="Consumption exceeded the recommended threshold." />
      </div>

      <div class="field">
        <label>{{ t('notifications.level') }}</label>
        <select v-model="level">
          <option value="INFO">INFO</option>
          <option value="WARNING">WARNING</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
      </div>

      <button type="submit" class="primary-btn">
        {{ t('notifications.create') }}
      </button>
    </form>

    <AlertList
      :alerts="notificationsStore.sortedAlerts"
      @mark-read="notificationsStore.markAsRead"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNotificationsStore } from '../../../application/stores/notifications.store';
import type { AlertLevel } from '../../../domain/model/alert.entity';
import AlertList from '../../components/alert-list/AlertList.vue';

const { t } = useI18n();
const notificationsStore = useNotificationsStore();

const title = ref('');
const message = ref('');
const level = ref<AlertLevel>('INFO');

onMounted(() => {
  notificationsStore.loadAlerts();
});

async function handleSubmit() {
  if (!title.value.trim() || !message.value.trim()) return;

  await notificationsStore.sendAlert({
    title: title.value,
    message: message.value,
    level: level.value,
  });

  title.value = '';
  message.value = '';
  level.value = 'INFO';
}
</script>

<style scoped lang="scss">
.alerts-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card,
.counter-card,
.alert-form {
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

.counter-card {
  min-width: 170px;
  padding: 20px;
}

.counter-card span {
  display: block;
  color: var(--text-soft);
  margin-bottom: 8px;
}

.counter-card strong {
  font-size: 2rem;
  color: var(--text-main);
}

.error-message {
  margin: 0;
  color: var(--danger-text);
  font-weight: 700;
}

.alert-form {
  display: grid;
  grid-template-columns: 1fr 1.4fr 180px 160px;
  align-items: end;
  gap: 16px;
  padding: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: var(--text-muted);
  font-weight: 800;
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
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--accent-main);
  color: var(--accent-contrast);
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
}

@media (max-width: 980px) {
  .hero-card {
    flex-direction: column;
  }

  .alert-form {
    grid-template-columns: 1fr;
  }
}
</style>