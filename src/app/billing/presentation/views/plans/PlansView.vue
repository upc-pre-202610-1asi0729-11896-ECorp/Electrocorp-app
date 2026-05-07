<template>
  <section class="plans-view">
    <div class="hero-card">
      <div>
        <p class="eyebrow">{{ t('billing.eyebrow') }}</p>
        <h1>{{ t('billing.title') }}</h1>
        <p class="subtitle">{{ t('billing.subtitle') }}</p>
      </div>

      <div v-if="billingStore.activeSubscription" class="subscription-card">
        <span>{{ t('billing.activeSubscription') }}</span>
        <strong>{{ billingStore.activeSubscription.planCode }}</strong>
        <small>{{ billingStore.activeSubscription.status }}</small>

        <button
          v-if="billingStore.hasActiveSubscription"
          type="button"
          class="cancel-btn"
          @click="billingStore.cancelSubscription"
        >
          {{ t('billing.cancel') }}
        </button>
      </div>
    </div>

    <p v-if="billingStore.error" class="error-message">
      {{ billingStore.error }}
    </p>

    <div class="plans-grid">
      <PlanCard
        v-for="plan in billingStore.plans"
        :key="plan.id"
        :plan="plan"
        :loading="billingStore.loading"
        :is-current-plan="
          billingStore.activeSubscription?.planCode === plan.code &&
          billingStore.activeSubscription?.status === 'ACTIVE'
        "
        @subscribe="billingStore.subscribe"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBillingStore } from '../../../application/stores/billing.store';
import PlanCard from '../../components/plan-card/PlanCard.vue';

const { t } = useI18n();
const billingStore = useBillingStore();

onMounted(async () => {
  await billingStore.loadPlans();
  await billingStore.loadActiveSubscription();
});
</script>

<style scoped lang="scss">
.plans-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card,
.subscription-card {
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

.subscription-card {
  min-width: 260px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subscription-card span,
.subscription-card small {
  color: var(--text-soft);
}

.subscription-card strong {
  font-size: 1.4rem;
  color: var(--text-main);
}

.cancel-btn {
  margin-top: 8px;
  border: none;
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--danger-bg);
  color: var(--danger-text);
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
}

.error-message {
  margin: 0;
  color: var(--danger-text);
  font-weight: 700;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 20px;
}

@media (max-width: 980px) {
  .hero-card {
    flex-direction: column;
  }

  .plans-grid {
    grid-template-columns: 1fr;
  }
}
</style>