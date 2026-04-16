/* =========================================================
   ElectroCorp - app.js
   Lógica de UI: navegación, dispositivos, modal, toast, charts
   ========================================================= */

/* ---------- Navegación entre secciones ---------- */
function showSection(id, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active-menu'));
    el.classList.add('active-menu');
}

/* ---------- Estado de dispositivos ---------- */
const devices = {
    1: { name: 'Refrigeradora',      active: true  },
    2: { name: 'TV',                  active: true  },
    3: { name: 'Aire acondicionado',  active: false }
};

function toggleDevice(id, buttonId) {
    const device = devices[id];
    device.active = !device.active;

    const estado = document.getElementById('estado-' + id);
    const button = document.getElementById(buttonId);

    if (device.active) {
        estado.innerText = 'Activado';
        estado.className = 'estado-activo';

        button.innerText = 'Desactivar';
        button.className = 'btn-danger';
    } else {
        estado.innerText = 'Desactivado';
        estado.className = 'estado-inactivo';

        button.innerText = 'Activar';
        button.className = 'btn-success';
    }

    notify(`${device.name} ${device.active ? 'activado' : 'desactivado'}`);
}

/* ---------- Modal ---------- */
function openModal() {
    document.getElementById('modal').classList.add('open');
}

function closeModal(save) {
    const modal = document.getElementById('modal');
    const input = document.getElementById('kwh-input');

    if (save) {
        const value = input.value;
        if (!value) {
            notify('Ingresa un valor válido', true);
            return;
        }
        notify(`Consumo de ${value} kWh registrado`);
    }

    input.value = '';
    modal.classList.remove('open');
}

/* ---------- Toast ---------- */
let toastTimer;
function notify(message, isError) {
    const t = document.getElementById('toast');
    t.innerText = message || 'Acción realizada';
    t.style.background = isError
        ? 'linear-gradient(45deg, #ef4444, #f87171)'
        : 'linear-gradient(45deg, #22c55e, #4ade80)';
    t.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Gráficos (Chart.js) ---------- */
const chartTextColor = '#f1f5f9';
const chartGridColor = 'rgba(255,255,255,0.08)';
const chartMutedColor = '#94a3b8';

const commonScales = {
    x: { ticks: { color: chartMutedColor }, grid: { color: chartGridColor } },
    y: { ticks: { color: chartMutedColor }, grid: { color: chartGridColor } }
};

document.addEventListener('DOMContentLoaded', () => {
    /* Línea - consumo semanal */
    const lineCtx = document.getElementById('chart');
    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Consumo (kWh)',
                    data: [12, 19, 10, 15, 14, 9, 11],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56,189,248,0.2)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#38bdf8'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: chartTextColor } } },
                scales: commonScales
            }
        });
    }

    /* Barras - consumo por dispositivo */
    const barCtx = document.getElementById('chartBar');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['TV', 'Refri', 'AC', 'Laptop'],
                datasets: [{
                    label: 'kWh',
                    data: [40, 120, 60, 30],
                    backgroundColor: [
                        'rgba(56,189,248,0.8)',
                        'rgba(125,211,252,0.8)',
                        'rgba(34,197,94,0.8)',
                        'rgba(245,158,11,0.8)'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: chartTextColor } } },
                scales: commonScales
            }
        });
    }
});
