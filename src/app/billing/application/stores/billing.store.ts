import { defineStore } from 'pinia';
import { computed, shallowRef, ref } from 'vue';
import type { Plan } from '../../domain/model/plan.entity';
import type { Subscription } from '../../domain/model/subscription.entity';
import { BillingFacade } from '../services/billing.facade';

export const useBillingStore = defineStore('billing', () => {
    const facade = new BillingFacade();

    const plans = shallowRef<Plan[]>([]);
    const activeSubscription = shallowRef<Subscription | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const hasActiveSubscription = computed(() =>
        activeSubscription.value?.status === 'ACTIVE'
    );

    async function loadBilling(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            plans.value = await facade.getPlans();
            activeSubscription.value = await facade.getActiveSubscription();
        } catch {
            error.value = 'No se pudo cargar la información de planes.';
        } finally {
            loading.value = false;
        }
    }

    async function subscribe(plan: Plan): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            activeSubscription.value = await facade.createSubscription({
                planCode: plan.code,
            });
        } catch {
            error.value = 'No se pudo crear la suscripción.';
        } finally {
            loading.value = false;
        }
    }

    async function cancelSubscription(): Promise<void> {
        if (!activeSubscription.value) return;

        loading.value = true;
        error.value = null;

        try {
            activeSubscription.value = await facade.cancelSubscription({
                subscriptionId: activeSubscription.value.id,
            });
        } catch {
            error.value = 'No se pudo cancelar la suscripción.';
        } finally {
            loading.value = false;
        }
    }

    return {
        plans,
        activeSubscription,
        loading,
        error,
        hasActiveSubscription,
        loadBilling,
        subscribe,
        cancelSubscription,
    };
});