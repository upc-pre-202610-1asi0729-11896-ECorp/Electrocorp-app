<template>
  <div v-if="show" class="dialog-backdrop">
    <section class="dialog-card">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>

      <div class="actions">
        <button type="button" class="ghost-btn" @click="$emit('cancel')">
          {{ cancelLabel }}
        </button>

        <button type="button" class="danger-btn" @click="$emit('confirm')">
          {{ confirmLabel }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped lang="scss">
.dialog-backdrop {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(7, 18, 37, 0.78);
  backdrop-filter: blur(8px);
  z-index: 60;
}

.dialog-card {
  width: 100%;
  max-width: 460px;
  padding: 28px;
  border-radius: 24px;
  background: #0b1f3f;
  border: 1px solid rgba(66, 194, 255, 0.18);
  box-shadow: 0 0 30px rgba(58, 186, 255, 0.16);
}

h2 {
  margin: 0 0 10px;
}

p {
  margin: 0 0 22px;
  color: #d9e7ff;
  line-height: 1.5;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.ghost-btn,
.danger-btn {
  border: none;
  padding: 11px 14px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
}

.ghost-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.danger-btn {
  background: rgba(255, 99, 99, 0.18);
  color: #ffb3b3;
}
</style>