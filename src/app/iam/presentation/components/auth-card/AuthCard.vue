<template>
  <section class="auth-view">
    <div class="auth-card">
      <div class="auth-header">
        <p class="eyebrow">ElectroCorp</p>
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>

      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
}>();
</script>

<style scoped lang="scss">
.auth-view {
  min-height: calc(100vh - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  width: 100%;
  max-width: 520px;
  padding: 34px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(66, 194, 255, 0.15);
  box-shadow: 0 0 30px rgba(58, 186, 255, 0.14);
}

.auth-header {
  margin-bottom: 26px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #42c2ff;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0 0 10px;
  font-size: 2rem;
}

p {
  margin: 0;
  color: #d9e7ff;
  line-height: 1.5;
}
</style>