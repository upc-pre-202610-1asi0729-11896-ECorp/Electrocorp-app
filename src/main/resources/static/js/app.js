/* =========================================================
   ElectroCorp - app.js
   Integrado con Spring Boot API
   Funcionalidades:
   - i18n (ES/EN/PT)
   - tema claro/oscuro
   - dispositivos desde API
   - alertas desde API
   - historial local
   - charts en vivo
   - reloj y atajos
   ========================================================= */

/* ============ API ============ */
const API_BASE = '';

function deviceFromApi(dto) {
    return {
        id: dto.id,
        name: dto.name,
        active: dto.status === 'ON',
        code: dto.code,
        type: dto.type,
        ownerId: dto.ownerId
    };
}

async function fetchDevicesFromApi() {
    const res = await fetch(`${API_BASE}/api/devices`);
    if (!res.ok) throw new Error('No se pudieron cargar los dispositivos');
    const data = await res.json();
    return data.map(deviceFromApi);
}

async function createDeviceInApi(name) {
    const payload = {
        name: name,
        code: 'DEV-' + Math.floor(Math.random() * 100000),
        type: 'SMART_PLUG',
        ownerId: '11111111-1111-1111-1111-111111111111'
    };

    const res = await fetch(`${API_BASE}/api/devices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('No se pudo crear el dispositivo');
    return await res.json();
}

async function turnDeviceOnInApi(id) {
    const res = await fetch(`${API_BASE}/api/devices/${id}/turn-on`, {
        method: 'PUT'
    });
    if (!res.ok) throw new Error('No se pudo encender el dispositivo');
}

async function turnDeviceOffInApi(id) {
    const res = await fetch(`${API_BASE}/api/devices/${id}/turn-off`, {
        method: 'PUT'
    });
    if (!res.ok) throw new Error('No se pudo apagar el dispositivo');
}

async function fetchAlertsFromApi() {
    const res = await fetch(`${API_BASE}/api/alerts`);
    if (!res.ok) throw new Error('No se pudieron cargar las alertas');
    return await res.json();
}

/* ============ I18N ============ */
const I18N = {
    es: {
        'app.title': 'ElectroCorp',
        'topbar.welcome': 'Bienvenido',
        'menu.centro': 'Centro Energético',
        'menu.analitica': 'Analítica',
        'menu.dispositivos': 'Dispositivos',
        'menu.historial': 'Historial',
        'menu.insights': 'IA Energética',
        'centro.title': 'Centro Energético',
        'centro.monthly': 'Consumo mensual',
        'centro.cost': 'Gasto estimado',
        'centro.saving': 'Ahorro',
        'centro.devices': 'Dispositivos',
        'centro.addConsumption': 'Agregar consumo',
        'centro.simulate': 'Simular semana',
        'analitica.title': 'Analítica Avanzada',
        'analitica.peak': 'Hora pico',
        'analitica.topDay': 'Día mayor consumo',
        'analitica.avg': 'Promedio diario',
        'analitica.forecast': 'Predicción',
        'dispositivos.title': 'Dispositivos',
        'dispositivos.search': 'Buscar dispositivo...',
        'dispositivos.add': 'Agregar',
        'dispositivos.colName': 'Dispositivo',
        'dispositivos.colState': 'Estado',
        'dispositivos.colAction': 'Acción',
        'dispositivos.activate': 'Activar',
        'dispositivos.deactivate': 'Desactivar',
        'dispositivos.delete': 'Eliminar',
        'dispositivos.activated': 'Activado',
        'dispositivos.deactivated': 'Desactivado',
        'dispositivos.promptName': 'Nombre del dispositivo:',
        'historial.title': 'Historial',
        'historial.subtitle': 'Últimos registros',
        'historial.export': 'Exportar CSV',
        'historial.clear': 'Limpiar',
        'historial.empty': 'Sin registros',
        'insights.title': 'IA Energética',
        'modal.title': 'Nuevo Consumo',
        'modal.cancel': 'Cancelar',
        'modal.save': 'Guardar',
        'days.mon': 'Lun', 'days.tue': 'Mar', 'days.wed': 'Mié',
        'days.thu': 'Jue', 'days.fri': 'Vie', 'days.sat': 'Sáb', 'days.sun': 'Dom',
        'msg.saved': 'Consumo de {v} kWh registrado',
        'msg.invalid': 'Ingresa un valor válido',
        'msg.langChanged': 'Idioma cambiado a Español',
        'msg.themeLight': 'Tema claro activado',
        'msg.themeDark': 'Tema oscuro activado',
        'msg.deleted': '{n} eliminado',
        'msg.added': '{n} agregado',
        'msg.cleared': 'Historial limpiado',
        'msg.simulated': 'Datos simulados'
    },
    en: {
        'app.title': 'ElectroCorp',
        'topbar.welcome': 'Welcome',
        'menu.centro': 'Energy Hub',
        'menu.analitica': 'Analytics',
        'menu.dispositivos': 'Devices',
        'menu.historial': 'History',
        'menu.insights': 'AI Energy',
        'centro.title': 'Energy Hub',
        'centro.monthly': 'Monthly usage',
        'centro.cost': 'Estimated cost',
        'centro.saving': 'Savings',
        'centro.devices': 'Devices',
        'centro.addConsumption': 'Add usage',
        'centro.simulate': 'Simulate week',
        'analitica.title': 'Advanced Analytics',
        'analitica.peak': 'Peak hour',
        'analitica.topDay': 'Top usage day',
        'analitica.avg': 'Daily average',
        'analitica.forecast': 'Forecast',
        'dispositivos.title': 'Devices',
        'dispositivos.search': 'Search device...',
        'dispositivos.add': 'Add',
        'dispositivos.colName': 'Device',
        'dispositivos.colState': 'State',
        'dispositivos.colAction': 'Action',
        'dispositivos.activate': 'Turn on',
        'dispositivos.deactivate': 'Turn off',
        'dispositivos.delete': 'Delete',
        'dispositivos.activated': 'On',
        'dispositivos.deactivated': 'Off',
        'dispositivos.promptName': 'Device name:',
        'historial.title': 'History',
        'historial.subtitle': 'Recent records',
        'historial.export': 'Export CSV',
        'historial.clear': 'Clear',
        'historial.empty': 'No records',
        'insights.title': 'AI Energy',
        'modal.title': 'New Usage',
        'modal.cancel': 'Cancel',
        'modal.save': 'Save',
        'days.mon': 'Mon', 'days.tue': 'Tue', 'days.wed': 'Wed',
        'days.thu': 'Thu', 'days.fri': 'Fri', 'days.sat': 'Sat', 'days.sun': 'Sun',
        'msg.saved': 'Usage of {v} kWh recorded',
        'msg.invalid': 'Enter a valid value',
        'msg.langChanged': 'Language changed to English',
        'msg.themeLight': 'Light theme enabled',
        'msg.themeDark': 'Dark theme enabled',
        'msg.deleted': '{n} deleted',
        'msg.added': '{n} added',
        'msg.cleared': 'History cleared',
        'msg.simulated': 'Data simulated'
    },
    pt: {
        'app.title': 'ElectroCorp',
        'topbar.welcome': 'Bem-vindo',
        'menu.centro': 'Centro Energético',
        'menu.analitica': 'Analítica',
        'menu.dispositivos': 'Dispositivos',
        'menu.historial': 'Histórico',
        'menu.insights': 'IA Energética',
        'centro.title': 'Centro Energético',
        'centro.monthly': 'Consumo mensal',
        'centro.cost': 'Gasto estimado',
        'centro.saving': 'Economia',
        'centro.devices': 'Dispositivos',
        'centro.addConsumption': 'Adicionar consumo',
        'centro.simulate': 'Simular semana',
        'analitica.title': 'Analítica Avançada',
        'analitica.peak': 'Hora pico',
        'analitica.topDay': 'Dia maior consumo',
        'analitica.avg': 'Média diária',
        'analitica.forecast': 'Previsão',
        'dispositivos.title': 'Dispositivos',
        'dispositivos.search': 'Buscar dispositivo...',
        'dispositivos.add': 'Adicionar',
        'dispositivos.colName': 'Dispositivo',
        'dispositivos.colState': 'Estado',
        'dispositivos.colAction': 'Ação',
        'dispositivos.activate': 'Ativar',
        'dispositivos.deactivate': 'Desativar',
        'dispositivos.delete': 'Excluir',
        'dispositivos.activated': 'Ativado',
        'dispositivos.deactivated': 'Desativado',
        'dispositivos.promptName': 'Nome do dispositivo:',
        'historial.title': 'Histórico',
        'historial.subtitle': 'Últimos registros',
        'historial.export': 'Exportar CSV',
        'historial.clear': 'Limpar',
        'historial.empty': 'Sem registros',
        'insights.title': 'IA Energética',
        'modal.title': 'Novo Consumo',
        'modal.cancel': 'Cancelar',
        'modal.save': 'Salvar',
        'days.mon': 'Seg', 'days.tue': 'Ter', 'days.wed': 'Qua',
        'days.thu': 'Qui', 'days.fri': 'Sex', 'days.sat': 'Sáb', 'days.sun': 'Dom',
        'msg.saved': 'Consumo de {v} kWh registrado',
        'msg.invalid': 'Insira um valor válido',
        'msg.langChanged': 'Idioma alterado para Português',
        'msg.themeLight': 'Tema claro ativado',
        'msg.themeDark': 'Tema escuro ativado',
        'msg.deleted': '{n} excluído',
        'msg.added': '{n} adicionado',
        'msg.cleared': 'Histórico limpo',
        'msg.simulated': 'Dados simulados'
    }
};

let currentLang = localStorage.getItem('ec.lang') || 'es';

function t(key, params) {
    let str = (I18N[currentLang] && I18N[currentLang][key]) || key;
    if (params) Object.keys(params).forEach(k => { str = str.replace(`{${k}}`, params[k]); });
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

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ec.lang', lang);
    applyTranslations();
    renderDevices();
    renderHistory();
    renderInsights();
    updateChartLabels();
    notify(t('msg.langChanged'));
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

async function loadDevices() {
    try {
        devices = await fetchDevicesFromApi();
        nextDeviceId = devices.length + 1;
        renderDevices();
        recalcCentroStats();
        recalcBarChart();
    } catch (e) {
        console.error(e);
        notify('No se pudieron cargar los dispositivos', true);
    }
}

function renderDevices() {
    const tbody = document.getElementById('devices-tbody');
    if (!tbody) return;

    const q = (document.getElementById('device-search')?.value || '').toLowerCase();
    const list = devices.filter(d => d.name.toLowerCase().includes(q));

    tbody.innerHTML = list.map(d => `
        <tr>
            <td>${escapeHtml(d.name)}</td>
            <td class="${d.active ? 'estado-activo' : 'estado-inactivo'}">
                ${d.active ? t('dispositivos.activated') : t('dispositivos.deactivated')}
            </td>
            <td>
                <div class="row-actions">
                    <button class="${d.active ? 'btn-danger' : 'btn-success'} btn-icon"
                            onclick="toggleDevice('${d.id}')">
                        ${d.active ? t('dispositivos.deactivate') : t('dispositivos.activate')}
                    </button>
                    <button class="btn-ghost btn-icon" onclick="deleteDevice('${d.id}')">
                        🗑
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    const statDevices = document.getElementById('stat-devices');
    if (statDevices) statDevices.textContent = devices.length;
}

async function toggleDevice(id) {
    const d = devices.find(x => String(x.id) === String(id));
    if (!d) return;

    try {
        if (d.active) {
            await turnDeviceOffInApi(id);
            d.active = false;
        } else {
            await turnDeviceOnInApi(id);
            d.active = true;
        }

        renderDevices();
        recalcCentroStats();
        recalcBarChart();
        notify(`${d.name}: ${d.active ? t('dispositivos.activated') : t('dispositivos.deactivated')}`);
    } catch (e) {
        console.error(e);
        notify('No se pudo cambiar el estado del dispositivo', true);
    }
}

function deleteDevice(id) {
    devices = devices.filter(x => String(x.id) !== String(id));
    renderDevices();
    recalcCentroStats();
    recalcBarChart();
    notify(t('msg.deleted', { n: 'Dispositivo' }));
}

async function addDevicePrompt() {
    const name = prompt(t('dispositivos.promptName'));
    if (!name || !name.trim()) return;

    try {
        const created = await createDeviceInApi(name.trim());
        devices.push(deviceFromApi(created));
        renderDevices();
        recalcCentroStats();
        recalcBarChart();
        notify(t('msg.added', { n: created.name }));
    } catch (e) {
        console.error(e);
        notify('No se pudo agregar el dispositivo', true);
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

/* ============ INSIGHTS / ALERTS ============ */
async function renderInsights() {
    const el = document.getElementById('insights-list');
    if (!el) return;

    try {
        const alerts = await fetchAlertsFromApi();

        if (!alerts.length) {
            el.innerHTML = `<div class="insight">✅ Sin alertas activas.</div>`;
            return;
        }

        el.innerHTML = alerts
            .map(a => `<div class="insight">${escapeHtml(a.message)}</div>`)
            .join('');
    } catch (e) {
        console.error(e);
        el.innerHTML = `<div class="insight">⚠️ No se pudieron cargar las alertas.</div>`;
    }
}

/* ============ MODAL ============ */
function openModal() {
    document.getElementById('modal').classList.add('open');
}

function closeModal(save) {
    const modal = document.getElementById('modal');
    const input = document.getElementById('kwh-input');

    if (save) {
        const value = parseFloat(input.value);
        if (!value || value <= 0) {
            notify(t('msg.invalid'), true);
            return;
        }

        history.unshift({ day: new Date().toLocaleDateString(), value });
        saveHistory();
        renderHistory();
        addPointToLineChart(value);
        recalcCentroStats();
        recalcAnalitica();
        recalcBarChart();
        notify(t('msg.saved', { v: value }));
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

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', async () => {
    applyTheme();
    applyTranslations();
    buildCharts();
    await loadDevices();
    renderHistory();
    await renderInsights();
    startClock();
    recalcAnalitica();
    recalcCentroStats();
    recalcBarChart();
});