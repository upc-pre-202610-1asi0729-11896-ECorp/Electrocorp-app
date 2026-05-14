<template>
  <article class="plan-card" :class="{ featured: plan.code === 'PROFESSIONAL' }">
    <div>
      <p class="eyebrow">{{ plan.code }}</p>
      <h2>{{ plan.name }}</h2>

      <p class="price">
        S/ {{ plan.monthlyPrice }}
        <span>/ {{ t('billing.month') }}</span>
      </p>
    </div>

    <ul>
      <li v-for="feature in plan.features" :key="feature">
        {{ feature }}
      </li>
    </ul>

    <button
      type="button"
      class="primary-btn"
      :disabled="loading || isCurrentPlan"
      @click="$emit('subscribe', plan)"
    >
      {{ isCurrentPlan ? t('billing.currentPlan') : t('billing.subscribe') }}
    </button>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Plan } from '../../../domain/model/plan.entity';

defineProps<{
  plan: Plan;
  loading: boolean;
  isCurrentPlan: boolean;
}>();

defineEmits<{
  subscribe: [plan: Plan];
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.plan-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

.plan-card.featured {
  border-color: rgba(34, 197, 94, 0.45);
  box-shadow: 0 0 32px rgba(34, 197, 94, 0.16);
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--accent-main);
  font-weight: 900;
  letter-spacing: 0.08em;
}

h2 {
  margin: 0;
  font-size: 1.7rem;
  color: var(--text-main);
}

.price {
  margin: 16px 0 0;
  font-size: 2rem;
  font-weight: 900;
  color: var(--text-main);
}

.price span {
  font-size: 0.95rem;
  color: var(--text-soft);
}

ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 18px;
  color: var(--text-muted);
  flex: 1;
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

.primary-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>