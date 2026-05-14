<template>
  <p class="switch-text">
    {{ text }}
    <RouterLink :to="to">
      {{ label }}
    </RouterLink>
  </p>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  text: string;
  label: string;
  to: string;
}>();
</script>

<style scoped lang="scss">
.switch-text {
  margin: 18px 0 0;
  color: #b8c7e0;
  text-align: center;
}

a {
  color: #42c2ff;
  font-weight: 900;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>