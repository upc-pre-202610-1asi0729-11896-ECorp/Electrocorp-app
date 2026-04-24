const AUTH_API = '/api/users';

function notify(message, isError) {
    const toastEl = document.getElementById('toast');
    toastEl.textContent = message || 'OK';
    toastEl.style.background = isError
        ? 'linear-gradient(45deg, #ef4444, #f87171)'
        : 'linear-gradient(45deg, #22c55e, #4ade80)';
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2200);
}

async function login() {
    const email = document.getElementById('login-email')?.value?.trim();
    const password = document.getElementById('login-password')?.value?.trim();

    if (!email || !password) {
        notify('Completa correo y contraseña', true);
        return;
    }

    try {
        const res = await fetch(`${AUTH_API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'No se pudo iniciar sesión');
        }

        const user = await res.json();
        localStorage.setItem('ec.currentUserId', user.id);
        localStorage.setItem('ec.currentUserName', user.fullName);
        localStorage.setItem('ec.currentUserEmail', user.email);

        notify('Inicio de sesión exitoso');
        setTimeout(() => {
            window.location.href = '/app/dashboard.html';
        }, 700);
    } catch (e) {
        console.error(e);
        notify(e.message || 'Error al iniciar sesión', true);
    }
}

async function register() {
    const fullName = document.getElementById('register-fullname')?.value?.trim();
    const email = document.getElementById('register-email')?.value?.trim();
    const password = document.getElementById('register-password')?.value?.trim();

    if (!fullName || !email || !password) {
        notify('Completa todos los campos', true);
        return;
    }

    try {
        const res = await fetch(`${AUTH_API}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'No se pudo registrar');
        }

        notify('Cuenta creada correctamente');
        setTimeout(() => {
            window.location.href = '/app/login.html';
        }, 700);
    } catch (e) {
        console.error(e);
        notify(e.message || 'Error al registrarse', true);
    }
}

function goToRegister() {
    window.location.href = '/app/register.html';
}

function goToLogin() {
    window.location.href = '/app/login.html';
}