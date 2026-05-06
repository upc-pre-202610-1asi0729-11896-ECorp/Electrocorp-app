async function handleSubmit() {
  await iamStore.signIn({
    email: email.value,
    password: password.value,
  });

  if (iamStore.isAuthenticated) {
    router.push('/home');
  }
}

<style scoped lang="scss">
.auth-view {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.auth-card {
  width: 100%;
  max-width: 520px;
  padding: 32px;
  border-radius: 24px;
  background: var(--surface-main);
  border: 1px solid var(--border-accent);
  box-shadow: var(--shadow-accent);
}

h1 {
  margin: 0 0 24px;
  color: var(--text-main);
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
}

input {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: var(--surface-strong);
  color: var(--text-main);
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.primary-btn,
.ghost-btn {
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
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
}
</style>