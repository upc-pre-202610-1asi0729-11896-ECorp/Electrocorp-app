import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import { Routine } from '../../domain/model/routine.entity';
import type { Device } from '../../domain/model/device.entity';
import type { CreateDeviceDto } from '../dtos/create-device.dto';
import type { CreateRoutineDto } from '../dtos/create-routine.dto';
import { DeviceControlFacade } from '../services/device-control.facade';
import { RoutineConflictCheckerService } from '../../domain/services/routine-conflict-checker.service';

export const useDeviceControlStore = defineStore('device-control', () => {
    const facade = new DeviceControlFacade();
    const routineConflictChecker = new RoutineConflictCheckerService();

    const devices = shallowRef<Device[]>([]);
    const routines = shallowRef<Routine[]>([]);

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
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudieron cargar los dispositivos.';
        } finally {
            loading.value = false;
        }
    }

    async function loadRoutines(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            routines.value = await facade.getRoutines();
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudieron cargar las rutinas.';
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
        } catch (exception) {
            console.error(exception);
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
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo actualizar el estado del dispositivo.';
        }
    }

    async function removeDevice(deviceId: number): Promise<void> {
        error.value = null;

        try {
            await facade.deleteDevice(deviceId);

            devices.value = devices.value.filter((device) => device.id !== deviceId);
            routines.value = routines.value.filter((routine) => routine.deviceId !== deviceId);
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo eliminar el dispositivo.';
        }
    }

    async function addRoutine(payload: CreateRoutineDto): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            const candidateRoutine = new Routine({
                id: Date.now(),
                name: payload.name,
                deviceId: payload.deviceId,
                action: payload.action,
                scheduledTime: payload.scheduledTime,
                enabled: true,
            });

            const hasConflict = routineConflictChecker.hasConflict(
                candidateRoutine,
                routines.value
            );

            if (hasConflict) {
                error.value = 'Ya existe una rutina activa para ese dispositivo en el mismo horario.';
                return;
            }

            const createdRoutine = await facade.createRoutine(payload);
            routines.value = [createdRoutine, ...routines.value];
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo crear la rutina.';
        } finally {
            loading.value = false;
        }
    }

    async function toggleRoutine(routineId: number): Promise<void> {
        error.value = null;

        const currentRoutine = routines.value.find((routine) => routine.id === routineId);

        if (!currentRoutine) return;

        try {
            const updatedRoutine = await facade.updateRoutineEnabled(
                routineId,
                !currentRoutine.enabled
            );

            if (!updatedRoutine) return;

            routines.value = routines.value.map((routine) =>
                routine.id === routineId ? updatedRoutine : routine
            );
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo actualizar la rutina.';
        }
    }

    async function removeRoutine(routineId: number): Promise<void> {
        error.value = null;

        try {
            await facade.deleteRoutine(routineId);
            routines.value = routines.value.filter((routine) => routine.id !== routineId);
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo eliminar la rutina.';
        }
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
        loadRoutines,
        addDevice,
        toggleDevice,
        removeDevice,
        addRoutine,
        toggleRoutine,
        removeRoutine,
        getDeviceName,
    };
});