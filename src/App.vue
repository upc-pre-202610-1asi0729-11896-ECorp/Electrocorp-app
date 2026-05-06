<template>
  <AppLayout />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppLayout from './app/shared/presentation/components/layout/AppLayout.vue';
import { useIamStore } from './app/iam/application/stores/iam.store';
import { useUiStore } from './app/shared/application/stores/ui.store';

const iamStore = useIamStore();
const uiStore = useUiStore();

onMounted(() => {
  iamStore.restoreSession();
  uiStore.restoreUiPreferences();
});
</script>