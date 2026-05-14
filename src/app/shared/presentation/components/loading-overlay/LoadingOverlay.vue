<template>
  <div v-if="show" class="loading-overlay">
    <div class="loader-card">
      <div class="spinner"></div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  message: string;
}>();
</script>

<style scoped lang="scss">
.loading-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(7, 18, 37, 0.72);
  backdrop-filter: blur(8px);
  z-index: 50;
}

.loader-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(66, 194, 255, 0.18);
  color: #d9e7ff;
}

.spinner {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 4px solid rgba(255, 255, 255, 0.16);
  border-top-color: #42c2ff;
  animation: spin 0.8s linear infinite;
}

p {
  margin: 0;
  font-weight: 700;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>