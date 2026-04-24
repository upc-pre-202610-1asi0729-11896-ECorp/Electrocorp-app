/* =========================================================
   ElectroCorp - app.js
   SPA integrada con Spring Boot API
   ========================================================= */

/* ============ API ============ */
const API_BASE = '';

let currentUserId = localStorage.getItem('ec.currentUserId') || null;
let currentUserProfiles = [];

function requireAuth() {
    const userId = localStorage.getItem('ec.currentUserId');
    if (!userId) {
        window.location.href = '/app/login.html';
        return false;
    }
    return true;
}

function deviceFromApi(dto) {
    return {
        id: dto.id,
        name: dto.name,
        active: dto.status === 'ON',
        code: dto.code,
        type: dto.type,
        ownerId: dto.ownerId,
        schedules: dto.schedules || [],
        currentConsumption: dto.status === 'ON' ? 0.8 : 0,
        monthlyConsumption: 0
    };
}

async function safeFetch(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
            const data = await res.json();
            msg = data.message || data.error || msg;
        } catch (_) {}
        throw new Error(msg);
    }
    return res;
}

/* ---------- Devices ---------- */
async function fetchDevicesFromApi() {
    const res = await safeFetch(`${API_BASE}/api/devices`);
    const data = await res.json();
    return data.map(deviceFromApi);
}

async function createDeviceInApi(name, type) {
    const payload = {
        name,
        code: 'DEV-' + Math.floor(Math.random() * 100000),
        type,
        ownerId: currentUserId || '11111111-1111-1111-1111-111111111111'
    };

    const res = await safeFetch(`${API_BASE}/api/devices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    return await res.json();
}

async function turnDeviceOnInApi(id) {
    await safeFetch(`${API_BASE}/api/devices/${id}/turn-on`, { method: 'PUT' });
}

async function turnDeviceOffInApi(id) {
    await safeFetch(`${API_BASE}/api/devices/${id}/turn-off`, { method: 'PUT' });
}

async function renameDeviceInApi(id, name) {
    const res = await safeFetch(`${API_BASE}/api/devices/${id}/rename`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    return await res.json();
}

async function scheduleDeviceInApi(id, executeAt, turnOn) {
    const res = await safeFetch(`${API_BASE}/api/devices/${id}/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ executeAt, turnOn })
    });
    return await res.json();
}

async function deleteDeviceInApi(id) {
    await safeFetch(`${API_BASE}/api/devices/${id}`, { method: 'DELETE' });
}

/* ---------- Energy ---------- */
async function createEnergyReadingInApi(deviceId, amount) {
    const res = await safeFetch(`${API_BASE}/api/energy/readings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, amount })
    });
    return await res.json();
}

async function fetchEnergyReadingsFromApi() {
    const res = await safeFetch(`${API_BASE}/api/energy/readings`);
    return await res.json();
}

async function fetchRecommendationsFromApi() {
    const res = await safeFetch(`${API_BASE}/api/energy/recommendations`);
    return await res.json();
}

/* ---------- Alerts ---------- */
async function fetchAlertsFromApi() {
    const res = await safeFetch(`${API_BASE}/api/alerts`);
    return await res.json();
}

/* ---------- Users ---------- */
async function registerUserInApi(fullName, email, password) {
    const res = await safeFetch(`${API_BASE}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
    });
    return await res.json();
}

async function blockUserInApi(userId) {
    const res = await safeFetch(`${API_BASE}/api/users/${userId}/block`, {
        method: 'PUT'
    });
    return await res.json();
}

async function createAccessProfileInApi(userId, fullName, email, accessLevel) {
    const res = await safeFetch(`${API_BASE}/api/users/${userId}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, accessLevel })
    });
    return await res.json();
}

/* ============ I18N ============ */

let I18N = {};
let currentLang = localStorage.getItem('ec.lang') || 'es';
const I18N_VERSION = 'v2';

async function loadI18n(lang = currentLang) {
    const res = await fetch(`i18n/${lang}.json?${I18N_VERSION}`, {
        cache: 'no-store'
    });
    if (!res.ok) throw new Error(`No se pudo cargar el idioma ${lang}`);
    I18N = await res.json();
    console.log('I18N cargado:', lang, I18N);
}

function t(key, params) {
    let str = I18N[key] || key;

    if (params) {
        Object.keys(params).forEach(k => {
            str = str.replace(`{${k}}`, params[k]);
        });
    }

    return str;
}

function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === currentLang);
    });
}

async function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ec.lang', lang);

    try {
        await loadI18n(lang);
        applyTranslations();
        renderDevices();
        renderHistory();
        await renderInsights();
        updateChartLabels();
        notify(t('msg.langChanged'));

        renderRoutinesSection?.();
        renderRealtimeSection?.();
        renderReportsSection?.();
        renderNotificationsSection?.();
        renderActivitySection?.();
        renderAccountInfo?.();
    } catch (e) {
        console.error(e);
        notify('No se pudo cambiar el idioma', true);
    }
}

/* ============ THEME ============ */
function applyTheme() {
    const theme = localStorage.getItem('ec.theme') || 'dark';
    document.body.classList.toggle('light', theme === 'light');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme === 'light' ? '☀️' : '🌙';
}

function toggleTheme() {
    const next = document.body.classList.contains('light') ? 'dark' : 'light';
    localStorage.setItem('ec.theme', next);
    applyTheme();
    notify(next === 'light' ? t('msg.themeLight') : t('msg.themeDark'));
}

/* ============ NAV ============ */
function showSection(id, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active-menu'));
    if (el) el.classList.add('active-menu');
    else document.querySelector(`.menu-item[data-section="${id}"]`)?.classList.add('active-menu');
}

/* ============ DEVICES ============ */
let devices = [];
let nextDeviceId = 1;
let energyReadings = [];
let alertsCache = [];

async function loadDevices() {
    try {
        devices = await fetchDevicesFromApi();
        nextDeviceId = devices.length + 1;
        renderAllLinkedSections();
    } catch (e) {
        console.error(e);
        notify('No se pudieron cargar los dispositivos', true);
    }
}

function renderDevices() {
    const tbody = document.getElementById('devices-tbody');
    if (!tbody) return;

    const q = (document.getElementById('device-search')?.value || '').toLowerCase();
    const list = devices.filter(d =>
        d.name.toLowerCase().includes(q) ||
        String(d.type || '').toLowerCase().includes(q)
    );

    tbody.innerHTML = list.map(d => `
        <tr>
            <td>${escapeHtml(d.name)}</td>
            <td>${escapeHtml(formatDeviceType(d.type))}</td>
            <td class="${d.active ? 'estado-activo' : 'estado-inactivo'}">
                ${d.active ? t('dispositivos.activated') : t('dispositivos.deactivated')}
            </td>
            <td>
                <div class="row-actions">
                    <button class="${d.active ? 'btn-danger' : 'btn-success'} btn-icon"
                            onclick="toggleDevice('${d.id}')">
                        ${d.active ? t('dispositivos.deactivate') : t('dispositivos.activate')}
                    </button>
                    <button class="btn-ghost btn-icon" onclick="renameDevicePrompt('${d.id}')" title="Renombrar">✏️</button>
                    <button class="btn-ghost btn-icon" onclick="scheduleDevicePrompt('${d.id}')" title="Programar">⏰</button>
                    <button class="btn-ghost btn-icon" onclick="deleteDevice('${d.id}')" title="Eliminar">🗑</button>
                </div>
            </td>
        </tr>
    `).join('');

    const statDevices = document.getElementById('stat-devices');
    if (statDevices) statDevices.textContent = devices.length;
}

function renderSchedules() {
    const ul = document.getElementById('device-schedules-list');
    if (!ul) return;

    const items = [];

    devices.forEach(d => {
        (d.schedules || []).forEach(s => {
            items.push({
                text: `${d.name} · ${s.executeAt || '--:--'} · ${s.turnOn ? 'Encender' : 'Apagar'}`
            });
        });
    });

    if (!items.length) {
        ul.innerHTML = `<li><span>Sin horarios registrados</span></li>`;
        return;
    }

    ul.innerHTML = items.map(item => `<li><span>${escapeHtml(item.text)}</span></li>`).join('');
}

async function toggleDevice(id) {
    const d = devices.find(x => String(x.id) === String(id));
    if (!d) return;

    try {
        if (d.active) {
            await turnDeviceOffInApi(id);
            pushNotification('info', 'Dispositivo apagado', `${d.name} fue apagado manualmente.`);
            pushActivity(`Apagó ${d.name}`);
        } else {
            await turnDeviceOnInApi(id);
            pushNotification('info', 'Dispositivo encendido', `${d.name} fue encendido manualmente.`);
            pushActivity(`Encendió ${d.name}`);
        }

        await loadDevices();
        await loadAlerts();
        notify(`${d.name}: actualizado`);
    } catch (e) {
        console.error(e);
        notify('No se pudo cambiar el estado del dispositivo', true);
    }
}

async function deleteDevice(id) {
    const d = devices.find(x => String(x.id) === String(id));
    if (!d) return;

    if (!confirm(`¿Eliminar "${d.name}"?`)) return;

    try {
        await deleteDeviceInApi(id);
        pushNotification('warning', 'Dispositivo eliminado', `${d.name} fue retirado del sistema.`);
        pushActivity(`Eliminó el dispositivo ${d.name}`);

        await loadDevices();
        await loadAlerts();
        notify(t('msg.deleted', { n: d.name }));
    } catch (e) {
        console.error(e);
        notify('No se pudo eliminar el dispositivo', true);
    }
}

async function addDevicePrompt() {
    const name = prompt(t('dispositivos.promptName'));
    if (!name || !name.trim()) return;

    try {
        const created = await createDeviceInApi(name.trim());
        pushNotification('info', 'Nuevo dispositivo agregado', `${created.name} fue vinculado al sistema.`);
        pushActivity(`Agregó el dispositivo ${created.name}`);

        await loadDevices();
        notify(t('msg.added', { n: created.name }));
    } catch (e) {
        console.error(e);
        notify('No se pudo agregar el dispositivo', true);
    }
}

async function renameDevicePrompt(id) {
    const d = devices.find(x => String(x.id) === String(id));
    if (!d) return;

    const previousName = d.name;
    const newName = prompt('Nuevo nombre del dispositivo:', d.name);
    if (!newName || !newName.trim()) return;

    try {
        const updated = await renameDeviceInApi(id, newName.trim());
        pushNotification('info', 'Dispositivo renombrado', `${previousName} ahora se llama ${updated.name}.`);
        pushActivity(`Renombró ${previousName} a ${updated.name}`);

        await loadDevices();
        notify(`Dispositivo renombrado a ${updated.name}`);
    } catch (e) {
        console.error(e);
        notify('No se pudo renombrar el dispositivo', true);
    }
}

async function scheduleDevicePrompt(id) {
    const d = devices.find(x => String(x.id) === String(id));
    if (!d) return;

    const time = prompt('Hora del horario (HH:mm):', '18:30');
    if (!time) return;

    const action = confirm('Aceptar = encender, Cancelar = apagar');

    try {
        await scheduleDeviceInApi(id, time, action);
        pushNotification('info', 'Nueva rutina creada', `Se programó ${d.name} a las ${time}.`);
        pushActivity(`Programó ${d.name} a las ${time}`);

        await loadDevices();
        notify(`Horario registrado para ${d.name} a las ${time}`);
    } catch (e) {
        console.error(e);
        notify('No se pudo registrar el horario', true);
    }
}
/* ============ HISTORY ============ */
let history = JSON.parse(localStorage.getItem('ec.history') || 'null') || [
    { day: 'Hoy', value: 12 },
    { day: 'Ayer', value: 10 },
    { day: 'Lunes', value: 14 },
    { day: 'Domingo', value: 9 },
    { day: 'Sábado', value: 11 }
];

function saveHistory() {
    localStorage.setItem('ec.history', JSON.stringify(history));
}

function renderHistory() {
    const ul = document.getElementById('history-list');
    if (!ul) return;

    if (!history.length) {
        ul.innerHTML = `<li><span>${t('historial.empty')}</span></li>`;
        return;
    }

    ul.innerHTML = history.map(h => `
        <li><span>${escapeHtml(h.day)}</span><strong>${h.value} kWh</strong></li>
    `).join('');
}

function exportHistoryCSV() {
    const rows = [['day', 'kWh'], ...history.map(h => [h.day, h.value])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historial.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function clearHistory() {
    history = [];
    saveHistory();
    renderHistory();
    notify(t('msg.cleared'));
}

/* ============ ENERGY / ALERTS / RECOMMENDATIONS ============ */
async function loadEnergyReadings() {
    const ul = document.getElementById('energy-readings-list');

    try {
        energyReadings = await fetchEnergyReadingsFromApi();

        if (ul) {
            if (!energyReadings.length) {
                ul.innerHTML = `<li><span>Sin lecturas energéticas</span></li>`;
            } else {
                ul.innerHTML = energyReadings.map(r => `
                    <li>
                        <span>${escapeHtml(String(r.recordedAt))}</span>
                        <strong>${r.amount} kWh</strong>
                    </li>
                `).join('');
            }
        }

        renderReportsSection?.();
        renderRealtimeSection?.();
    } catch (e) {
        console.error(e);
        energyReadings = [];

        if (ul) {
            ul.innerHTML = `<li><span>No se pudieron cargar las lecturas.</span></li>`;
        }
    }
}

async function loadAlerts() {
    try {
        alertsCache = await fetchAlertsFromApi();
    } catch (e) {
        console.error(e);
        alertsCache = [];
    }

    renderInsights?.();
    renderReportsSection?.();
}

async function renderInsights() {
    const el = document.getElementById('insights-list');
    if (!el) return;

    if (!alertsCache.length) {
        el.innerHTML = `<div class="insight">✅ Sin alertas activas.</div>`;
        return;
    }

    el.innerHTML = alertsCache
        .map(a => `<div class="insight">${escapeHtml(a.message)}</div>`)
        .join('');
}

async function loadRecommendations() {
    const el = document.getElementById('recommendations-list');
    if (!el) return;

    try {
        const recommendations = await fetchRecommendationsFromApi();

        if (!recommendations.length) {
            el.innerHTML = `<div class="insight">Sin recomendaciones disponibles.</div>`;
            return;
        }

        el.innerHTML = recommendations
            .map(r => `<div class="insight">${escapeHtml(String(r))}</div>`)
            .join('');
    } catch (e) {
        console.error(e);
        el.innerHTML = `<div class="insight">No se pudieron cargar las recomendaciones.</div>`;
    }
}

/* ============ USERS ============ */
function renderUserProfiles() {
    const ul = document.getElementById('user-profiles-list');
    if (!ul) return;

    if (!currentUserProfiles.length) {
        ul.innerHTML = `<li><span>Sin perfiles registrados</span></li>`;
        return;
    }

    ul.innerHTML = currentUserProfiles.map(p => `
        <li>
            <span>${escapeHtml(p.fullName)} · ${escapeHtml(p.email)} · ${escapeHtml(p.accessLevel)}</span>
        </li>
    `).join('');
}

async function registerUserPrompt() {
    const fullName = document.getElementById('user-fullname')?.value?.trim();
    const email = document.getElementById('user-email')?.value?.trim();
    const password = document.getElementById('user-password')?.value?.trim();

    if (!fullName || !email || !password) {
        notify('Completa todos los campos del usuario', true);
        return;
    }

    try {
        const user = await registerUserInApi(fullName, email, password);
        currentUserId = user.id;
        localStorage.setItem('ec.currentUserId', currentUserId);
        notify(`Usuario registrado: ${user.fullName}`);
    } catch (e) {
        console.error(e);
        notify('No se pudo registrar el usuario', true);
    }
}

async function createAccessProfilePrompt() {
    if (!currentUserId) {
        notify('Primero registra un usuario', true);
        return;
    }

    const fullName = prompt('Nombre del perfil:');
    if (!fullName) return;
    const email = prompt('Correo del perfil:');
    if (!email) return;
    const accessLevel = prompt('Nivel de acceso (ADMIN, FAMILY_MEMBER, EMPLOYEE, VIEWER):', 'VIEWER');
    if (!accessLevel) return;

    try {
        await createAccessProfileInApi(currentUserId, fullName.trim(), email.trim(), accessLevel.trim().toUpperCase());
        currentUserProfiles.push({
            fullName: fullName.trim(),
            email: email.trim(),
            accessLevel: accessLevel.trim().toUpperCase()
        });
        renderUserProfiles();
        notify('Perfil de acceso creado');
    } catch (e) {
        console.error(e);
        notify('No se pudo crear el perfil de acceso', true);
    }
}

async function blockUserPrompt() {
    if (!currentUserId) {
        notify('Primero registra un usuario', true);
        return;
    }

    if (!confirm('¿Bloquear al usuario actual?')) return;

    try {
        await blockUserInApi(currentUserId);
        notify('Usuario bloqueado');
    } catch (e) {
        console.error(e);
        notify('No se pudo bloquear el usuario', true);
    }
}

/* ============ MODAL ============ */
function openModal() {
    document.getElementById('modal').classList.add('open');
}

async function closeModal(save) {
    const modal = document.getElementById('modal');
    const input = document.getElementById('kwh-input');

    if (save) {
        const value = parseFloat(input.value);

        if (!value || value <= 0) {
            notify(t('msg.invalid'), true);
            return;
        }

        if (!devices.length) {
            notify('Primero crea al menos un dispositivo', true);
            return;
        }

        try {
            await createEnergyReadingInApi(devices[0].id, value);

            history.unshift({ day: new Date().toLocaleDateString(), value });
            saveHistory();
            renderHistory();

            addPointToLineChart(value);
            recalcCentroStats();
            recalcAnalitica();
            recalcBarChart();

            await loadEnergyReadings();
            await loadAlerts();
            await loadRecommendations();
            renderAllLinkedSections();

            notify(t('msg.saved', { v: value }));
        } catch (e) {
            console.error(e);
            notify('No se pudo registrar el consumo', true);
            return;
        }
    }

    input.value = '';
    modal.classList.remove('open');
}

/* ============ TOAST ============ */
let toastTimer;
function notify(message, isError) {
    const toastEl = document.getElementById('toast');
    toastEl.textContent = message || 'OK';
    toastEl.style.background = isError
        ? 'linear-gradient(45deg, #ef4444, #f87171)'
        : 'linear-gradient(45deg, #22c55e, #4ade80)';
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

/* ============ CHARTS ============ */
const chartTextColor = () => document.body.classList.contains('light') ? '#0f172a' : '#f1f5f9';
const chartGridColor = () => document.body.classList.contains('light') ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)';
let lineChart, barChart;

function dayLabels() {
    return ['days.mon','days.tue','days.wed','days.thu','days.fri','days.sat','days.sun'].map(t);
}

function buildCharts() {
    const lineCtx = document.getElementById('chart');
    if (lineCtx) {
        lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: dayLabels(),
                datasets: [{
                    label: 'kWh',
                    data: [12, 19, 10, 15, 14, 9, 11],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56,189,248,0.2)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#38bdf8'
                }]
            },
            options: chartOptions()
        });
    }

    const barCtx = document.getElementById('chartBar');
    if (barCtx) {
        const { labels, data, colors } = barChartDataFromDevices();
        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'kWh',
                    data,
                    backgroundColor: colors,
                    borderRadius: 8
                }]
            },
            options: chartOptions()
        });
    }
}

function chartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: chartTextColor() }
            }
        },
        scales: {
            x: {
                ticks: { color: chartTextColor() },
                grid: { color: chartGridColor() }
            },
            y: {
                ticks: { color: chartTextColor() },
                grid: { color: chartGridColor() }
            }
        }
    };
}

function updateChartLabels() {
    if (lineChart) {
        lineChart.data.labels = dayLabels();
        lineChart.update();
    }

    [lineChart, barChart].forEach(c => {
        if (!c) return;
        c.options = chartOptions();
        c.update();
    });
}

function addPointToLineChart(value) {
    if (!lineChart) return;
    lineChart.data.datasets[0].data.push(value);
    lineChart.data.datasets[0].data.shift();
    lineChart.update();
}

function randomizeChart() {
    if (!lineChart) return;

    lineChart.data.datasets[0].data = Array.from({ length: 7 }, () => Math.round(5 + Math.random() * 20));
    lineChart.update();

    recalcAnalitica();
    recalcCentroStats();
    recalcBarChart();
    renderRealtimeSection?.();
    renderReportsSection?.();

    notify(t('msg.simulated'));
}

/* ============ CLOCK ============ */
function startClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const tick = () => { el.textContent = new Date().toLocaleTimeString(); };
    tick();
    setInterval(tick, 1000);
}

/* ============ HELPERS ============ */
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => (
        {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]
    ));
}

function formatDeviceType(type) {
    const map = {
        SMART_PLUG: 'Smart Plug',
        SMART_SWITCH: 'Smart Switch',
        SENSOR: 'Sensor'
    };
    return map[type] || type || '-';
}

/* ============ KEYBOARD ============ */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.getElementById('modal')?.classList.remove('open');
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showSection('dispositivos');
        document.getElementById('device-search')?.focus();
    }
});

/* ================================================================
   LÓGICA DE NEGOCIO — Recálculo de métricas
   ================================================================ */
const TARIFA_SOL_KWH = 0.45;
const CONSUMO_DEVICE_KWH = 8;
const PEAK_HOURS = ['6 AM', '8 AM', '12 PM', '3 PM', '7 PM', '9 PM'];

function recalcAnalitica() {
    if (!lineChart) return;

    const data = lineChart.data.datasets[0].data;
    const labels = lineChart.data.labels;

    const total = data.reduce((s, v) => s + v, 0);
    const avg = total / data.length;

    const maxIdx = data.indexOf(Math.max(...data));
    const topDay = labels[maxIdx] || '--';

    const peakIdx = Math.round((data[maxIdx] / 25) * (PEAK_HOURS.length - 1));
    const peakHour = PEAK_HOURS[Math.min(peakIdx, PEAK_HOURS.length - 1)];

    const forecast = (avg * 30 * TARIFA_SOL_KWH).toFixed(0);

    const cards = document.querySelectorAll('#analitica .card.stat p');
    if (cards[0]) cards[0].textContent = peakHour;
    if (cards[1]) cards[1].textContent = topDay;
    if (cards[2]) cards[2].textContent = avg.toFixed(1) + ' kWh';
    if (cards[3]) cards[3].textContent = 'S/ ' + forecast;
}

function recalcCentroStats() {
    if (!lineChart) return;

    const data = lineChart.data.datasets[0].data;
    const weeklyTotal = data.reduce((s, v) => s + v, 0);
    const activeDevices = devices.filter(d => d.active).length;

    const monthly = Math.round(weeklyTotal * 4 + activeDevices * CONSUMO_DEVICE_KWH);
    const cost = (monthly * TARIFA_SOL_KWH).toFixed(0);

    const inactiveDevices = devices.filter(d => !d.active).length;
    const saving = Math.min(inactiveDevices * 3 + 5, 40);

    const statMonthly = document.getElementById('stat-monthly');
    const statCost = document.getElementById('stat-cost');

    if (statMonthly) statMonthly.textContent = monthly + ' kWh';
    if (statCost) statCost.textContent = 'S/ ' + cost;

    const savingCards = document.querySelectorAll('#centro .card.stat p');
    if (savingCards[2]) savingCards[2].textContent = saving + '%';
}

function openAddDeviceModal() {
    const modal = document.getElementById('device-modal');
    if (!modal) return;

    const nameInput = document.getElementById('device-name-input');
    const typeSelect = document.getElementById('device-type-select');

    if (nameInput) nameInput.value = '';
    if (typeSelect) typeSelect.value = 'SMART_PLUG';

    modal.classList.add('open');
}

async function closeAddDeviceModal(save) {
    const modal = document.getElementById('device-modal');
    const nameInput = document.getElementById('device-name-input');
    const typeSelect = document.getElementById('device-type-select');

    if (!modal || !nameInput || !typeSelect) return;

    if (!save) {
        modal.classList.remove('open');
        return;
    }

    const name = nameInput.value.trim();
    const type = typeSelect.value;

    if (!name) {
        notify('Ingresa un nombre para el dispositivo', true);
        return;
    }

    try {
        const created = await createDeviceInApi(name, type);
        const newDevice = {
            ...deviceFromApi(created),
            currentConsumption: 0,
            monthlyConsumption: 0
        };

        devices.push(newDevice);
        pushNotification('info', 'Nuevo dispositivo agregado', `${newDevice.name} fue vinculado al sistema.`);
        pushActivity(`Agregó el dispositivo ${newDevice.name}`);
        renderAllLinkedSections();
        notify(t('msg.added', { n: newDevice.name }));

        modal.classList.remove('open');
    } catch (e) {
        console.error(e);
        notify('No se pudo agregar el dispositivo', true);
    }
}

function openRoutineModal() {
    const modal = document.getElementById('routine-modal');
    const select = document.getElementById('routine-device');

    if (!modal || !select) return;

    select.innerHTML = '';

    if (!devices.length) {
        notify('Primero crea un dispositivo', true);
        return;
    }

    devices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.id;
        option.textContent = `${device.name} (${device.code})`;
        select.appendChild(option);
    });

    modal.classList.add('open');
}

function closeRoutineModal(save) {
    const modal = document.getElementById('routine-modal');
    if (!modal) return;

    if (!save) {
        modal.classList.remove('open');
        return;
    }

    createRoutineFromModal();
}

async function createRoutineFromModal() {
    const deviceSelect = document.getElementById('routine-device');
    const timeInput = document.getElementById('routine-time');
    const actionSelect = document.getElementById('routine-action');
    const modal = document.getElementById('routine-modal');

    if (!deviceSelect || !timeInput || !actionSelect) return;

    const deviceId = deviceSelect.value;
    const executeAt = timeInput.value;
    const turnOn = actionSelect.value === 'true';

    if (!deviceId || !executeAt) {
        notify('Completa todos los campos', true);
        return;
    }

    try {
        await scheduleDeviceInApi(deviceId, executeAt, turnOn);

        const device = devices.find(d => String(d.id) === String(deviceId));
        if (device) {
            if (!device.schedules) device.schedules = [];
            device.schedules.push({ executeAt, turnOn });
        }

        pushNotification(
            'info',
            'Nueva rutina creada',
            `Se programó ${device?.name || 'el dispositivo'} a las ${executeAt}.`
        );

        pushActivity(`Programó ${device?.name || 'un dispositivo'} a las ${executeAt}`);

        await loadDevices();
        renderRoutinesSection();
        renderAllLinkedSections();

        modal.classList.remove('open');
        notify('Rutina registrada correctamente');
    } catch (e) {
        console.error(e);
        notify('No se pudo registrar la rutina', true);
    }
}

function barChartDataFromDevices() {
    const weeklyData = lineChart ? lineChart.data.datasets[0].data : [12,19,10,15,14,9,11];
    const weeklyTotal = weeklyData.reduce((s, v) => s + v, 0);
    const activeCount = devices.filter(d => d.active).length || 1;
    const basePerDevice = weeklyTotal / activeCount;

    const PALETTE_ACTIVE = [
        'rgba(56,189,248,0.85)',
        'rgba(125,211,252,0.85)',
        'rgba(34,197,94,0.85)',
        'rgba(245,158,11,0.85)',
        'rgba(168,85,247,0.85)',
        'rgba(249,115,22,0.85)'
    ];
    const COLOR_INACTIVE = 'rgba(148,163,184,0.35)';

    let colorIdx = 0;
    const labels = [], data = [], colors = [];

    devices.forEach(d => {
        labels.push(d.name.length > 10 ? d.name.slice(0, 9) + '…' : d.name);
        if (d.active) {
            const seed = ((String(d.id).length * 7) % 5) * 0.15;
            data.push(Math.round(basePerDevice * (0.7 + seed)));
            colors.push(PALETTE_ACTIVE[colorIdx % PALETTE_ACTIVE.length]);
            colorIdx++;
        } else {
            data.push(Math.round(basePerDevice * 0.05));
            colors.push(COLOR_INACTIVE);
        }
    });

    return { labels, data, colors };
}

function recalcBarChart() {
    if (!barChart) return;
    const { labels, data, colors } = barChartDataFromDevices();
    barChart.data.labels = labels;
    barChart.data.datasets[0].data = data;
    barChart.data.datasets[0].backgroundColor = colors;
    barChart.update();
}

function logout() {
    localStorage.removeItem('ec.currentUserId');
    localStorage.removeItem('ec.currentUserName');
    localStorage.removeItem('ec.currentUserEmail');
    window.location.href = '/app/login.html';
}

const defaultDevices = [
    {
        id: 'dev-001',
        name: 'Refrigeradora',
        active: true,
        code: 'DEV-001',
        type: 'SMART_PLUG',
        ownerId: 'local-user',
        schedules: [{ executeAt: '06:00', turnOn: true }],
        currentConsumption: 1.8,
        monthlyConsumption: 85
    },
    {
        id: 'dev-002',
        name: 'Aire acondicionado',
        active: true,
        code: 'DEV-002',
        type: 'SMART_SWITCH',
        ownerId: 'local-user',
        schedules: [{ executeAt: '13:00', turnOn: true }],
        currentConsumption: 3.2,
        monthlyConsumption: 110
    },
    {
        id: 'dev-003',
        name: 'Luces del local',
        active: false,
        code: 'DEV-003',
        type: 'SMART_SWITCH',
        ownerId: 'local-user',
        schedules: [{ executeAt: '22:00', turnOn: false }],
        currentConsumption: 0.0,
        monthlyConsumption: 42
    },
    {
        id: 'dev-004',
        name: 'Router principal',
        active: true,
        code: 'DEV-004',
        type: 'SENSOR',
        ownerId: 'local-user',
        schedules: [],
        currentConsumption: 0.2,
        monthlyConsumption: 12
    }
];

function seedDevicesIfEmpty() {
    if (!devices.length) {
        devices = JSON.parse(JSON.stringify(defaultDevices));
    }
}

let notificationsData = [
    { type: 'warning', title: 'Alto consumo detectado', message: 'Aire acondicionado superó el umbral configurado.', time: 'Hace 10 min' },
    { type: 'info', title: 'Rutina ejecutada', message: 'Luces del local apagadas automáticamente a las 22:00.', time: 'Hoy, 22:00' }
];

let activityData = [
    { user: 'Jean Franck', action: 'Ingresó al panel principal', time: '11:22' },
    { user: 'Sistema', action: 'Sincronizó 4 dispositivos', time: '11:20' }
];

function getActiveDevices() {
    return devices.filter(d => d.active);
}

function getTotalCurrentConsumption() {
    return devices.reduce((sum, d) => sum + (d.active ? d.currentConsumption : 0), 0);
}

function getTopCurrentDevice() {
    const activeDevices = getActiveDevices();
    if (!activeDevices.length) return null;
    return [...activeDevices].sort((a, b) => b.currentConsumption - a.currentConsumption)[0];
}

function getTopConsumers() {
    return [...devices].sort((a, b) => b.monthlyConsumption - a.monthlyConsumption);
}

function nowTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function pushNotification(type, title, message) {
    notificationsData.unshift({
        type,
        title,
        message,
        time: nowTime()
    });

    notificationsData = notificationsData.slice(0, 10);
}

function pushActivity(action) {
    const user = localStorage.getItem('ec.currentUserName') || 'Jean Franck';
    activityData.unshift({
        user,
        action,
        time: nowTime()
    });

    activityData = activityData.slice(0, 15);
}

function renderRoutinesSection() {
    const list = document.getElementById('routines-list');
    const nextEl = document.getElementById('routine-next');
    const activeCountEl = document.getElementById('routine-active-count');
    const pausedCountEl = document.getElementById('routine-paused-count');

    if (!list) return;

    const routines = devices.flatMap(device =>
        (device.schedules || []).map(schedule => ({
            deviceName: device.name,
            deviceCode: device.code,
            executeAt: schedule.executeAt,
            turnOn: schedule.turnOn
        }))
    );

    if (!routines.length) {
        list.innerHTML = `<li><span>Sin horarios registrados</span></li>`;
        if (nextEl) nextEl.textContent = '--';
        if (activeCountEl) activeCountEl.textContent = '0';
        if (pausedCountEl) pausedCountEl.textContent = '0';
        return;
    }

    routines.sort((a, b) => a.executeAt.localeCompare(b.executeAt));

    list.innerHTML = routines.map(routine => `
        <li class="routine-item">
            <div>
                <strong>${escapeHtml(routine.deviceName)}</strong>
                <span class="muted"> · ${escapeHtml(routine.deviceCode)}</span>
            </div>
            <div>
                <span>${escapeHtml(routine.executeAt)}</span>
                <span class="badge ${routine.turnOn ? 'badge-success' : 'badge-warning'}">
                    ${routine.turnOn ? 'Encender' : 'Apagar'}
                </span>
            </div>
        </li>
    `).join('');

    if (nextEl) {
        const nextRoutine = routines[0];
        nextEl.textContent = `${nextRoutine.deviceName} · ${nextRoutine.executeAt}`;
    }

    if (activeCountEl) activeCountEl.textContent = String(routines.length);
    if (pausedCountEl) pausedCountEl.textContent = '0';
}

function renderRealtimeSection() {
    const currentConsumptionEl = document.getElementById('realtime-current-consumption');
    const activeDevicesEl = document.getElementById('realtime-active-devices');
    const topDeviceEl = document.getElementById('realtime-top-device');
    const systemStatusEl = document.getElementById('realtime-system-status');
    const feedUl = document.getElementById('realtime-feed-list');

    const totalCurrent = getTotalCurrentConsumption();
    const activeDevices = getActiveDevices();
    const topDevice = getTopCurrentDevice();

    if (currentConsumptionEl) currentConsumptionEl.textContent = `${totalCurrent.toFixed(1)} kWh`;
    if (activeDevicesEl) activeDevicesEl.textContent = String(activeDevices.length);
    if (topDeviceEl) topDeviceEl.textContent = topDevice ? topDevice.name : '--';
    if (systemStatusEl) systemStatusEl.textContent = activeDevices.length ? 'Estable' : 'Reposo';

    if (!feedUl) return;

    if (!devices.length) {
        feedUl.innerHTML = `<li><span>Sin dispositivos conectados</span></li>`;
        return;
    }

    feedUl.innerHTML = devices.map(device => `
        <li>
            <span>
                <strong>${escapeHtml(device.name)}</strong> ·
                ${device.active ? `${device.currentConsumption.toFixed(1)} kWh` : '0.0 kWh'} ·
                ${device.active ? 'Activo' : 'Apagado'}
            </span>
            <strong>${device.code}</strong>
        </li>
    `).join('');
}
function renderReportsSection() {
    const totalConsumptionEl = document.getElementById('report-total-consumption');
    const totalCostEl = document.getElementById('report-total-cost');
    const totalReadingsEl = document.getElementById('report-total-readings');
    const totalAlertsEl = document.getElementById('report-total-alerts');
    const topConsumersUl = document.getElementById('report-top-consumers-list');

    const totalConsumption = energyReadings.reduce((sum, r) => sum + Number(r.amount || 0), 0);
    const estimatedCost = Math.round(totalConsumption * TARIFA_SOL_KWH);
    const totalReadings = energyReadings.length;
    const totalAlerts = alertsCache.length;

    if (totalConsumptionEl) totalConsumptionEl.textContent = `${totalConsumption} kWh`;
    if (totalCostEl) totalCostEl.textContent = `S/ ${estimatedCost}`;
    if (totalReadingsEl) totalReadingsEl.textContent = String(totalReadings);
    if (totalAlertsEl) totalAlertsEl.textContent = String(totalAlerts);

    if (!topConsumersUl) return;

    const sorted = getTopConsumers();
    topConsumersUl.innerHTML = sorted.map(device => `
        <li>
            <span>${escapeHtml(device.name)}</span>
            <strong>${device.monthlyConsumption || 0} kWh</strong>
        </li>
    `).join('');
}

function renderNotificationsSection() {
    const container = document.getElementById('notifications-list');
    if (!container) return;

    if (!notificationsData.length) {
        container.innerHTML = `<div class="insight">${t('insights.noAlerts')}</div>`;
        return;
    }

    container.innerHTML = notificationsData.map(n => `
        <div class="insight">
            <strong>${escapeHtml(n.title)}</strong><br>
            <span>${escapeHtml(n.message)}</span><br>
            <small>${escapeHtml(n.time)}</small>
        </div>
    `).join('');
}

function renderActivitySection() {
    const ul = document.getElementById('activity-list');
    if (!ul) return;

    if (!activityData.length) {
        ul.innerHTML = `<li><span>Sin actividad registrada</span></li>`;
        return;
    }

    ul.innerHTML = activityData.map(item => `
        <li>
            <span>
                <strong>${escapeHtml(item.user)}</strong> ·
                ${escapeHtml(item.action)}
            </span>
            <strong>${escapeHtml(item.time)}</strong>
        </li>
    `).join('');
}

function renderAccountInfo() {
    const fullNameEl = document.getElementById('account-fullname');
    const emailEl = document.getElementById('account-email');
    const statusEl = document.getElementById('account-status');
    const linkedDevicesEl = document.getElementById('account-linked-devices');

    const userName = localStorage.getItem('ec.currentUserName') || 'Jean Franck Loa Rojas';
    const userEmail = localStorage.getItem('ec.currentUserEmail') || 'loarojas1@gmail.com';

    if (fullNameEl) fullNameEl.textContent = userName;
    if (emailEl) emailEl.textContent = userEmail;
    if (statusEl) statusEl.textContent = 'Activo';
    if (linkedDevicesEl) linkedDevicesEl.textContent = String(devices.length);
}

function renderAllLinkedSections() {
    renderDevices?.();
    renderRoutinesSection?.();
    renderRealtimeSection?.();
    renderReportsSection?.();
    renderNotificationsSection?.();
    renderActivitySection?.();
    renderAccountInfo?.();
    recalcCentroStats?.();
    recalcAnalitica?.();
    recalcBarChart?.();
}


/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', async () => {
    if (typeof requireAuth === 'function' && !requireAuth()) return;

    applyTheme();
    startClock();

    try {
        await loadI18n(currentLang);
        applyTranslations();
        buildCharts();

        await loadDevices();
        renderHistory();
        renderUserProfiles?.();

        await loadEnergyReadings();
        await loadAlerts();
        await loadRecommendations();

        renderAllLinkedSections();
    } catch (e) {
        console.error('Error iniciando la aplicación:', e);
        notify?.('No se pudo iniciar completamente la aplicación', true);
    }
});