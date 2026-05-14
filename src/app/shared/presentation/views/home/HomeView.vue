<template>
  <section class="home-view">
    <div class="hero-card">
      <div>
        <p class="eyebrow">{{ t('home.eyebrow') }}</p>
        <h1>{{ t('home.title') }}</h1>
        <p class="subtitle">{{ t('home.content') }}</p>
      </div>

      <div class="user-card">
        <span>{{ t('home.session') }}</span>
        <strong>{{ iamStore.currentUser?.fullName }}</strong>
        <small>{{ iamStore.currentUser?.email }}</small>
      </div>
    </div>

    <div class="summary-grid">
      <article class="summary-card">
        <span>{{ t('home.connectedDevices') }}</span>
        <strong>{{ deviceStore.totalDevices }}</strong>
        <small>{{ deviceStore.activeDevices }} {{ t('home.activeDevices') }}</small>
      </article>

      <article class="summary-card">
        <span>{{ t('home.currentConsumption') }}</span>
        <strong>{{ deviceStore.totalCurrentWatts }}W</strong>
        <small>{{ t('home.liveDeviceUsage') }}</small>
      </article>

      <article class="summary-card">
        <span>{{ t('home.unreadAlerts') }}</span>
        <strong>{{ notificationsStore.unreadCount }}</strong>
        <small>{{ t('home.alertsDescription') }}</small>
      </article>

      <article class="summary-card">
        <span>{{ t('home.subscription') }}</span>
        <strong>
          {{ billingStore.activeSubscription?.planCode ?? t('home.noSubscription') }}
        </strong>
        <small>
          {{ billingStore.activeSubscription?.status ?? t('home.choosePlan') }}
        </small>
      </article>
    </div>

    <div class="content-grid">
      <section class="panel-card">
        <div class="section-heading">
          <p class="eyebrow">{{ t('home.quickActions') }}</p>
          <h2>{{ t('home.managePlatform') }}</h2>
        </div>

        <div class="quick-grid">
          <RouterLink to="/device-control/devices" class="quick-link">
            <span>⚡</span>
            <div>
              <strong>{{ t('home.devicesAction') }}</strong>
              <small>{{ t('home.devicesActionDescription') }}</small>
            </div>
          </RouterLink>

          <RouterLink to="/energy-monitoring/dashboard" class="quick-link">
            <span>📊</span>
            <div>
              <strong>{{ t('home.energyAction') }}</strong>
              <small>{{ t('home.energyActionDescription') }}</small>
            </div>
          </RouterLink>

          <RouterLink to="/energy-monitoring/history" class="quick-link">
            <span>🕒</span>
            <div>
              <strong>{{ t('home.historyAction') }}</strong>
              <small>{{ t('home.historyActionDescription') }}</small>
            </div>
          </RouterLink>

          <RouterLink to="/notifications/alerts" class="quick-link">
            <span>🔔</span>
            <div>
              <strong>{{ t('home.alertsAction') }}</strong>
              <small>{{ t('home.alertsActionDescription') }}</small>
            </div>
          </RouterLink>

          <RouterLink to="/billing/plans" class="quick-link">
            <span>💳</span>
            <div>
              <strong>{{ t('home.billingAction') }}</strong>
              <small>{{ t('home.billingActionDescription') }}</small>
            </div>
          </RouterLink>
        </div>
      </section>

      <section class="panel-card">
        <div class="section-heading">
          <p class="eyebrow">{{ t('home.recommendationEyebrow') }}</p>
          <h2>{{ t('home.recommendationTitle') }}</h2>
        </div>

        <p class="recommendation">
          {{ energyStore.recommendation }}
        </p>

        <div class="status-row">
          <span>{{ t('home.averageConsumption') }}</span>
          <strong>{{ energyStore.averageWatts }}W</strong>
        </div>

        <div class="status-row">
          <span>{{ t('home.peakConsumption') }}</span>
          <strong>{{ energyStore.highestReading }}W</strong>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useIamStore } from '../../../../iam/application/stores/iam.store';
import { useDeviceControlStore } from '../../../../device-control/application/stores/device-control.store';
import { useEnergyMonitoringStore } from '../../../../energy-monitoring/application/stores/energy-monitoring.store';
import { useNotificationsStore } from '../../../../notifications/application/stores/notifications.store';
import { useBillingStore } from '../../../../billing/application/stores/billing.store';

const { t } = useI18n();

const iamStore = useIamStore();
const deviceStore = useDeviceControlStore();
const energyStore = useEnergyMonitoringStore();
const notificationsStore = useNotificationsStore();
const billingStore = useBillingStore();

onMounted(async () => {
  await deviceStore.loadDevices();
  await deviceStore.loadRoutines();
  await energyStore.loadReadings();
  await notificationsStore.loadAlerts();
  await billingStore.loadPlans();
  await billingStore.loadActiveSubscription();
});

</script>

<style scoped lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card,
.summary-card,
.panel-card,
.user-card {
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
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
  font-size: 2.3rem;
}

.subtitle {
  max-width: 760px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 0;
}

.user-card {
  min-width: 280px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-card span {
  color: var(--text-soft);
}

.user-card strong {
  color: var(--text-main);
  font-size: 1.2rem;
}

.user-card small {
  color: var(--text-muted);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 16px;
}

.summary-card {
  padding: 22px;
}

.summary-card span {
  display: block;
  color: var(--text-soft);
  margin-bottom: 8px;
}

.summary-card strong {
  display: block;
  font-size: 1.8rem;
  color: var(--text-main);
  margin-bottom: 6px;
}

.summary-card small {
  color: var(--text-muted);
}

.content-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 24px;
}

.panel-card {
  padding: 28px;
}

.section-heading {
  margin-bottom: 20px;
}

.section-heading h2 {
  margin-bottom: 0;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 16px;
}

.quick-link {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 18px;
  border-radius: 18px;
  text-decoration: none;
  background: var(--surface-strong);
  border: 1px solid var(--border-soft);
  transition:
    transform 0.2s ease,
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
}

.quick-link:hover {
  transform: translateY(-2px);
  border-color: var(--border-accent);
  background: var(--surface-hover);
}

.quick-link span {
  font-size: 1.4rem;
}

.quick-link strong {
  display: block;
  color: var(--text-main);
  margin-bottom: 6px;
}

.quick-link small {
  color: var(--text-muted);
  line-height: 1.4;
}

.recommendation {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 22px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid var(--border-soft);
}

.status-row span {
  color: var(--text-soft);
}

.status-row strong {
  color: var(--text-main);
}

@media (max-width: 1100px) {
  .summary-grid,
  .content-grid,
  .quick-grid {
    grid-template-columns: 1fr;
  }

  .hero-card {
    flex-direction: column;
  }

  .user-card {
    min-width: 0;
  }
}
</style>