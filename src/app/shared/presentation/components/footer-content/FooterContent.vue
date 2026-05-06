<template>
  <footer class="footer">
    <p>© 2026 ElectroCorp. {{ t('footer.rights') }}</p>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped lang="scss">
.footer {
  padding: 16px 32px;
  text-align: center;
  border-top: 1px solid var(--border-soft);
  color: var(--text-soft);
  transition: color 0.25s ease, border-color 0.25s ease;
}

.footer p {
  margin: 0;
}
</style>