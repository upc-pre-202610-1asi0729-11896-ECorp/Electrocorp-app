import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import type { Device } from '../../domain/model/device.entity';
import { Routine } from '../../domain/model/routine.entity';
import type { CreateDeviceDto } from '../dtos/create-device.dto';
import type { CreateRoutineDto } from '../dtos/create-routine.dto';
import { DeviceControlFacade } from '../services/device-control.facade';
import { RoutineConflictCheckerService } from '../../domain/services/routine-conflict-checker.service';

export const useDeviceControlStore = defineStore('device-control', () => {
    const facade = new DeviceControlFacade();
    const routineConflictChecker = new RoutineConflictCheckerService();

    const devices = shallowRef<Device[]>([]);
    const routines = shallowRef<Routine[]>([
        new Routine({
            id: 1,
            name: 'Turn off living room at night',
            deviceId: 1,
            action: 'TURN_OFF',
            scheduledTime: '23:00',
            enabled: true,
        }),
        new Routine({
            id: 2,
            name: 'Turn on desk lamp',
            deviceId: 3,
            action: 'TURN_ON',
            scheduledTime: '19:00',
            enabled: true,
        }),
    ]);

    const loading = ref(false);
    const error = ref<string | null>(null);

    const totalDevices = computed(() => devices.value.length);

    const activeDevices = computed(() =>
        devices.value.filter((device) => device.status === 'ON').length
    );

    const totalCurrentWatts = computed(() =>
        devices.value
            .filter((device) => device.status === 'ON')
            .reduce((total, device) => total + device.powerWatts, 0)
    );

    const totalRoutines = computed(() => routines.value.length);

    const enabledRoutines = computed(() =>
        routines.value.filter((routine) => routine.enabled).length
    );

    async function loadDevices(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            devices.value = await facade.getDevices();
        } catch {
            error.value = 'No se pudieron cargar los dispositivos.';
        } finally {
            loading.value = false;
        }
    }

    async function addDevice(payload: CreateDeviceDto): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            const createdDevice = await facade.createDevice(payload);
            devices.value = [...devices.value, createdDevice];
        } catch {
            error.value = 'No se pudo crear el dispositivo.';
        } finally {
            loading.value = false;
        }
    }

    async function toggleDevice(deviceId: number): Promise<void> {
        error.value = null;

        const currentDevice = devices.value.find((device) => device.id === deviceId);

        if (!currentDevice) return;

        const nextStatus = currentDevice.status === 'ON' ? 'OFF' : 'ON';

        try {
            const updatedDevice = await facade.updateDeviceStatus({
                deviceId,
                status: nextStatus,
            });

            if (!updatedDevice) {
                error.value = 'No se encontró el dispositivo.';
                return;
            }

            devices.value = devices.value.map((device) =>
                device.id === deviceId ? updatedDevice : device
            );
        } catch {
            error.value = 'No se pudo actualizar el estado del dispositivo.';
        }
    }

    async function removeDevice(deviceId: number): Promise<void> {
        error.value = null;

        try {
            await facade.deleteDevice(deviceId);
            devices.value = devices.value.filter((device) => device.id !== deviceId);
            routines.value = routines.value.filter((routine) => routine.deviceId !== deviceId);
        } catch {
            error.value = 'No se pudo eliminar el dispositivo.';
        }
    }

    function addRoutine(payload: CreateRoutineDto): void {
        error.value = null;

        const newRoutine = new Routine({
            id: Date.now(),
            name: payload.name,
            deviceId: payload.deviceId,
            action: payload.action,
            scheduledTime: payload.scheduledTime,
            enabled: true,
        });

        const hasConflict = routineConflictChecker.hasConflict(newRoutine, routines.value);

        if (hasConflict) {
            error.value = 'Ya existe una rutina activa para ese dispositivo en el mismo horario.';
            return;
        }

        routines.value = [newRoutine, ...routines.value];
    }

    function toggleRoutine(routineId: number): void {
        routines.value = routines.value.map((routine) => {
            if (routine.id !== routineId) return routine;

            const updatedRoutine = new Routine({
                id: routine.id,
                name: routine.name,
                deviceId: routine.deviceId,
                action: routine.action,
                scheduledTime: routine.scheduledTime,
                enabled: routine.enabled,
            });

            updatedRoutine.toggleEnabled();

            return updatedRoutine;
        });
    }

    function removeRoutine(routineId: number): void {
        routines.value = routines.value.filter((routine) => routine.id !== routineId);
    }

    function getDeviceName(deviceId: number): string {
        return devices.value.find((device) => device.id === deviceId)?.name ?? 'Unknown device';
    }

    return {
        devices,
        routines,
        loading,
        error,
        totalDevices,
        activeDevices,
        totalCurrentWatts,
        totalRoutines,
        enabledRoutines,
        loadDevices,
        addDevice,
        toggleDevice,
        removeDevice,
        addRoutine,
        toggleRoutine,
        removeRoutine,
        getDeviceName,
    };
});