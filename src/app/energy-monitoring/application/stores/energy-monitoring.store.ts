import { defineStore } from 'pinia';
import { computed, shallowRef, ref } from 'vue';
import type { EnergyReading } from '../../domain/model/energy-reading.entity';
import { EnergyMonitoringFacade } from '../services/energy-monitoring.facade';
import type { FilterHistoryDto } from '../dtos/filter-history.dto';
import { AnomalyDetectionService } from '../../domain/services/anomaly-detection.service';

export const useEnergyMonitoringStore = defineStore('energy-monitoring', () => {
    const facade = new EnergyMonitoringFacade();
    const anomalyDetectionService = new AnomalyDetectionService();

    const readings = shallowRef<EnergyReading[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const totalWatts = computed(() =>
        readings.value.reduce((total, reading) => total + reading.watts, 0)
    );

    const averageWatts = computed(() => {
        if (readings.value.length === 0) return 0;

        return Math.round(totalWatts.value / readings.value.length);
    });

    const highestReading = computed(() => {
        if (readings.value.length === 0) return 0;

        return Math.max(...readings.value.map((reading) => reading.watts));
    });

    const highConsumptionReadings = computed(() =>
        anomalyDetectionService.detectHighConsumption(readings.value, 120)
    );

    const recommendation = computed(() =>
        anomalyDetectionService.getRecommendation(readings.value)
    );

    async function loadReadings(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            readings.value = await facade.getReadings();
        } catch {
            error.value = 'No se pudieron cargar las lecturas de consumo.';
        } finally {
            loading.value = false;
        }
    }

    async function filterReadings(payload: FilterHistoryDto): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            readings.value = await facade.filterReadings(payload);
        } catch {
            error.value = 'No se pudo filtrar el historial de consumo.';
        } finally {
            loading.value = false;
        }
    }

    function exportCsv(): void {
        const header = 'Device Name,Watts,Recorded At\n';

        const rows = readings.value
            .map((reading) =>
                `${reading.deviceName},${reading.watts},${reading.recordedAt}`
            )
            .join('\n');

        const csv = `${header}${rows}`;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'electrocorp-energy-history.csv';
        link.click();

        URL.revokeObjectURL(url);
    }

    return {
        readings,
        loading,
        error,
        totalWatts,
        averageWatts,
        highestReading,
        highConsumptionReadings,
        recommendation,
        loadReadings,
        filterReadings,
        exportCsv,
    };
});