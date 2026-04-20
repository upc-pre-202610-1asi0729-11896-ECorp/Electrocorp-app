/* =========================================================
   ElectroCorp - app.js
   Funcionalidades: i18n (ES/EN/PT), tema claro/oscuro,
   CRUD de dispositivos con búsqueda, historial dinámico
   con export CSV, charts en vivo, persistencia localStorage,
   reloj y atajos de teclado.
   ========================================================= */

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
        'msg.simulated': 'Datos simulados',
        'insight.1': '⚠️ Consumo elevado detectado en horas pico',
        'insight.2': '💡 Reduce el aire acondicionado 2°C para ahorrar 12%',
        'insight.3': '✅ Ahorro proyectado de S/ 35 este mes',
        'insight.4': '🔋 Tu refrigeradora consume más que el promedio'
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
        'msg.simulated': 'Data simulated',
        'insight.1': '⚠️ High usage detected at peak hours',
        'insight.2': '💡 Lower AC by 2°C to save 12%',
        'insight.3': '✅ Projected savings of S/ 35 this month',
        'insight.4': '🔋 Your fridge uses more than average'
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
        'msg.simulated': 'Dados simulados',
        'insight.1': '⚠️ Alto consumo detectado em horários de pico',
        'insight.2': '💡 Reduza o ar 2°C para economizar 12%',
        'insight.3': '✅ Economia projetada de S/ 35 este mês',
        'insight.4': '🔋 Sua geladeira consome mais que a média'
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
let devices = JSON.parse(localStorage.getItem('ec.devices') || 'null') || [
    { id: 1, name: 'Refrigeradora', active: true },
    { id: 2, name: 'TV', active: true },
    { id: 3, name: 'Aire acondicionado', active: false }
];
let nextDeviceId = devices.reduce((m, d) => Math.max(m, d.id), 0) + 1;

function saveDevices() { localStorage.setItem('ec.devices', JSON.stringify(devices)); }

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
                            onclick="toggleDevice(${d.id})">
                        ${d.active ? t('dispositivos.deactivate') : t('dispositivos.activate')}
                    </button>
                    <button class="btn-ghost btn-icon" onclick="deleteDevice(${d.id})">
                        🗑
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    const statDevices = document.getElementById('stat-devices');
    if (statDevices) statDevices.textContent = devices.length;
}

function toggleDevice(id) {
    const d = devices.find(x => x.id === id);
    if (!d) return;
    d.active = !d.active;
    saveDevices();
    renderDevices();
    // ── LÓGICA DE NEGOCIO: el costo estimado cambia según dispositivos activos ──
    recalcCentroStats();
    notify(`${d.name}: ${d.active ? t('dispositivos.activated') : t('dispositivos.deactivated')}`);
}

function deleteDevice(id) {
    const d = devices.find(x => x.id === id);
    if (!d) return;
    devices = devices.filter(x => x.id !== id);
    saveDevices();
    renderDevices();
    // ── LÓGICA DE NEGOCIO: recalcular al eliminar ──
    recalcCentroStats();
    notify(t('msg.deleted', { n: d.name }));
}

function addDevicePrompt() {
    const name = prompt(t('dispositivos.promptName'));
    if (!name || !name.trim()) return;
    const d = { id: nextDeviceId++, name: name.trim(), active: true };
    devices.push(d);
    saveDevices();
    renderDevices();
    // ── LÓGICA DE NEGOCIO: recalcular al agregar ──
    recalcCentroStats();
    notify(t('msg.added', { n: d.name }));
}

/* ============ HISTORY ============ */
let history = JSON.parse(localStorage.getItem('ec.history') || 'null') || [
    { day: 'Hoy',     value: 12 },
    { day: 'Ayer',    value: 10 },
    { day: 'Lunes',   value: 14 },
    { day: 'Domingo', value: 9  },
    { day: 'Sábado',  value: 11 }
];
function saveHistory() { localStorage.setItem('ec.history', JSON.stringify(history)); }

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
    a.href = url; a.download = 'historial.csv'; a.click();
    URL.revokeObjectURL(url);
}

function clearHistory() {
    history = [];
    saveHistory();
    renderHistory();
    notify(t('msg.cleared'));
}

/* ============ INSIGHTS ============ */
function renderInsights() {
    const el = document.getElementById('insights-list');
    if (!el) return;
    el.innerHTML = ['insight.1', 'insight.2', 'insight.3', 'insight.4']
        .map(k => `<div class="insight">${t(k)}</div>`).join('');
}

/* ============ MODAL ============ */
function openModal() { document.getElementById('modal').classList.add('open'); }

function closeModal(save) {
    const modal = document.getElementById('modal');
    const input = document.getElementById('kwh-input');

    if (save) {
        const value = parseFloat(input.value);
        if (!value || value <= 0) { notify(t('msg.invalid'), true); return; }
        history.unshift({ day: new Date().toLocaleDateString(), value });
        saveHistory();
        renderHistory();
        addPointToLineChart(value);
        // ── LÓGICA DE NEGOCIO: recalcular todo al agregar consumo ──
        recalcCentroStats();
        recalcAnalitica();
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
                    tension: 0.4, fill: true, pointBackgroundColor: '#38bdf8'
                }]
            },
            options: chartOptions()
        });
    }
    const barCtx = document.getElementById('chartBar');
    if (barCtx) {
        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['TV', 'Refri', 'AC', 'Laptop'],
                datasets: [{
                    label: 'kWh',
                    data: [40, 120, 60, 30],
                    backgroundColor: [
                        'rgba(56,189,248,0.8)','rgba(125,211,252,0.8)',
                        'rgba(34,197,94,0.8)','rgba(245,158,11,0.8)'
                    ],
                    borderRadius: 8
                }]
            },
            options: chartOptions()
        });
    }
}

function chartOptions() {
    return {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: chartTextColor() } } },
        scales: {
            x: { ticks: { color: chartTextColor() }, grid: { color: chartGridColor() } },
            y: { ticks: { color: chartTextColor() }, grid: { color: chartGridColor() } }
        }
    };
}

function updateChartLabels() {
    if (lineChart) { lineChart.data.labels = dayLabels(); lineChart.update(); }
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
    lineChart.data.datasets[0].data = Array.from({length: 7}, () => Math.round(5 + Math.random() * 20));
    lineChart.update();
    // ── LÓGICA DE NEGOCIO: actualizar analítica y centro con los datos nuevos ──
    recalcAnalitica();
    recalcCentroStats();
    notify(t('msg.simulated'));
}

/* ============ CLOCK ============ */
function startClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const tick = () => { el.textContent = new Date().toLocaleTimeString(); };
    tick(); setInterval(tick, 1000);
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

/**
 * Tarifa estimada por kWh en soles (Perú, referencia Osinergmin).
 * Se puede ajustar fácilmente desde aquí.
 */
const TARIFA_SOL_KWH = 0.45;

/**
 * Consumo base por dispositivo activo (kWh/mes estimado).
 * Permite que encender/apagar dispositivos afecte el gasto estimado.
 */
const CONSUMO_DEVICE_KWH = 8;

/**
 * Horas pico simuladas para el análisis (índices en el array de 7 días).
 * Se detecta según cuál día/hora tiene el valor más alto.
 */
const PEAK_HOURS = ['6 AM', '8 AM', '12 PM', '3 PM', '7 PM', '9 PM'];

/**
 * recalcAnalitica()
 * Lee los datos actuales del gráfico de líneas y actualiza las 4 cards
 * de la sección Analítica: hora pico, día de mayor consumo, promedio
 * diario y predicción del mes.
 */
function recalcAnalitica() {
    if (!lineChart) return;

    const data   = lineChart.data.datasets[0].data;   // [kWh x 7 días]
    const labels = lineChart.data.labels;              // ['Lun', 'Mar', ...]

    // -- Promedio diario --
    const total = data.reduce((s, v) => s + v, 0);
    const avg   = total / data.length;

    // -- Día de mayor consumo --
    const maxIdx  = data.indexOf(Math.max(...data));
    const topDay  = labels[maxIdx] || '--';

    // -- Hora pico: se asigna de forma proporcional al valor del día pico
    //    (cuanto mayor el consumo, más tarde en el día se concentra el pico)
    const peakIdx  = Math.round((data[maxIdx] / 25) * (PEAK_HOURS.length - 1));
    const peakHour = PEAK_HOURS[Math.min(peakIdx, PEAK_HOURS.length - 1)];

    // -- Predicción mensual: promedio diario × 30 días × tarifa --
    const forecast = (avg * 30 * TARIFA_SOL_KWH).toFixed(0);

    // -- Actualizar DOM --
    const cards = document.querySelectorAll('#analitica .card.stat p');
    // cards[0] = Hora pico, [1] = Día mayor consumo, [2] = Promedio diario, [3] = Predicción
    if (cards[0]) cards[0].textContent = peakHour;
    if (cards[1]) cards[1].textContent = topDay;
    if (cards[2]) cards[2].textContent = avg.toFixed(1) + ' kWh';
    if (cards[3]) cards[3].textContent = 'S/ ' + forecast;
}

/**
 * recalcCentroStats()
 * Actualiza las cards del Centro Energético:
 *  - Consumo mensual: suma semanal × 4 + ajuste por dispositivos activos
 *  - Gasto estimado: consumo mensual × tarifa
 *  - Ahorro: porcentaje basado en cuántos dispositivos están apagados
 */
function recalcCentroStats() {
    if (!lineChart) return;

    const data          = lineChart.data.datasets[0].data;
    const weeklyTotal   = data.reduce((s, v) => s + v, 0);
    const activeDevices = devices.filter(d => d.active).length;

    // Consumo mensual = proyección semanal × 4 + consumo base de dispositivos activos
    const monthly = Math.round(weeklyTotal * 4 + activeDevices * CONSUMO_DEVICE_KWH);

    // Gasto estimado en soles
    const cost = (monthly * TARIFA_SOL_KWH).toFixed(0);

    // Ahorro: cada dispositivo inactivo representa ~3% de ahorro (máx 40%)
    const inactiveDevices = devices.filter(d => !d.active).length;
    const saving = Math.min(inactiveDevices * 3 + 5, 40);

    // -- Actualizar DOM --
    const statMonthly = document.getElementById('stat-monthly');
    const statCost    = document.getElementById('stat-cost');

    if (statMonthly) statMonthly.textContent = monthly + ' kWh';
    if (statCost)    statCost.textContent    = 'S/ ' + cost;

    // Actualizar card de Ahorro (3er card.stat en #centro)
    const savingCards = document.querySelectorAll('#centro .card.stat p');
    if (savingCards[2]) savingCards[2].textContent = saving + '%';
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    applyTranslations();
    buildCharts();
    renderDevices();
    renderHistory();
    renderInsights();
    startClock();
    // Calcular métricas iniciales con los datos por defecto
    recalcAnalitica();
    recalcCentroStats();
});
