<template>
  <section class="auth-view">
    <div class="auth-card">
      <p class="eyebrow">{{ t('auth.register.eyebrow') }}</p>
      <h1>{{ t('auth.register.title') }}</h1>
      <p class="subtitle">
        {{ t('auth.register.subtitle') }}
      </p>

      <form class="auth-form" @submit.prevent="handleSubmit">
        <div class="field">
          <label>{{ t('auth.fullName') }}</label>
          <input v-model="fullName" type="text" placeholder="Jean Franck Loa Rojas" />
        </div>

        <div class="field">
          <label>{{ t('auth.email') }}</label>
          <input v-model="email" type="email" placeholder="jean@example.com" />
        </div>

        <div class="field">
          <label>{{ t('auth.password') }}</label>
          <input v-model="password" type="password" placeholder="123456" />
        </div>

        <p v-if="iamStore.error" class="error">{{ iamStore.error }}</p>

        <div class="actions">
          <button type="submit" class="primary-btn">
            {{ t('auth.register.createAccount') }}
          </button>

          <RouterLink to="/iam/login" class="ghost-btn">
            {{ t('auth.register.backToLogin') }}
          </RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useIamStore } from '../../../application/stores/iam.store';

const router = useRouter();
const iamStore = useIamStore();
const { t } = useI18n();

const fullName = ref('');
const email = ref('');
const password = ref('');

async function handleSubmit() {
  await iamStore.signUp({
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  });

  if (iamStore.isAuthenticated) {
    router.push('/home');
  }
}
</script>

<style scoped lang="scss">
.auth-view {
  min-height: calc(100vh - 180px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 48px;
}

.auth-card {
  width: 100%;
  max-width: 520px;
  padding: 34px;
  border-radius: 26px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--accent-main);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0 0 12px;
  color: var(--text-main);
  font-size: 2.2rem;
}

.subtitle {
  margin: 0 0 24px;
  color: var(--text-muted);
  line-height: 1.6;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: var(--text-muted);
  font-weight: 700;
}

input {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: var(--surface-strong);
  color: var(--text-main);
  font-family: inherit;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.primary-btn,
.ghost-btn {
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 900;
  cursor: pointer;
  font-family: inherit;
}

.primary-btn {
  border: none;
  background: var(--accent-main);
  color: var(--accent-contrast);
}

.ghost-btn {
  color: var(--text-muted);
  border: 1px solid var(--border-soft);
  background: transparent;
}

.error {
  color: var(--danger-text);
  margin: 0;
  font-weight: 700;
}
</style>