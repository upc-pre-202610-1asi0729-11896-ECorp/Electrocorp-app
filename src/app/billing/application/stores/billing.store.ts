import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';

import type { Plan } from '../../domain/model/plan.entity';
import type { PlanCode } from '../../domain/model/plan.entity';
import type { Subscription } from '../../domain/model/subscription.entity';
import { BillingFacade } from '../services/billing.facade';

export const useBillingStore = defineStore('billing', () => {
    const facade = new BillingFacade();

    const plans = shallowRef<Plan[]>([]);
    const activeSubscription = shallowRef<Subscription | null>(null);

    const loading = ref(false);
    const error = ref<string | null>(null);

    const activePlanCode = computed(() => activeSubscription.value?.planCode ?? null);

    const activePlan = computed(() =>
        plans.value.find((plan) => plan.code === activePlanCode.value) ?? null
    );

    async function loadPlans(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            plans.value = await facade.getPlans();
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudieron cargar los planes.';
        } finally {
            loading.value = false;
        }
    }

    async function loadActiveSubscription(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            activeSubscription.value = await facade.getActiveSubscription();
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo cargar la suscripción activa.';
        } finally {
            loading.value = false;
        }
    }

    async function subscribe(planCode: PlanCode): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            activeSubscription.value = await facade.subscribe({
                planCode,
            });
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo procesar la suscripción.';
        } finally {
            loading.value = false;
        }
    }

    async function cancelSubscription(): Promise<void> {
        if (!activeSubscription.value) return;

        loading.value = true;
        error.value = null;

        try {
            await facade.cancelSubscription(activeSubscription.value.id);
            activeSubscription.value = null;
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo cancelar la suscripción.';
        } finally {
            loading.value = false;
        }
    }

    return {
        plans,
        activeSubscription,
        activePlanCode,
        activePlan,
        loading,
        error,
        loadPlans,
        loadActiveSubscription,
        subscribe,
        cancelSubscription,
    };
});