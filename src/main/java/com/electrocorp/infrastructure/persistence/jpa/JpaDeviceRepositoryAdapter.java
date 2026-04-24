package com.electrocorp.infrastructure.persistence.jpa;

import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.model.DeviceSchedule;
import com.electrocorp.domain.device.repository.DeviceRepository;
import com.electrocorp.domain.device.valueobject.DeviceCode;
import com.electrocorp.domain.device.valueobject.DeviceName;
import com.electrocorp.domain.device.valueobject.DeviceStatus;
import com.electrocorp.domain.device.valueobject.DeviceType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class JpaDeviceRepositoryAdapter implements DeviceRepository {

    private final DeviceJpaRepository deviceJpaRepository;

    public JpaDeviceRepositoryAdapter(DeviceJpaRepository deviceJpaRepository) {
        this.deviceJpaRepository = deviceJpaRepository;
    }

    @Override
    public Device save(Device device) {
        DeviceEntity entity = new DeviceEntity(
                device.getId(),
                device.getCode().getValue(),
                device.getName().getValue(),
                device.getType().name(),
                device.getStatus().name(),
                device.getOwnerId()
        );

        entity.getSchedules().clear();

        for (DeviceSchedule schedule : device.getSchedules()) {
            DeviceScheduleEntity scheduleEntity = new DeviceScheduleEntity(
                    UUID.randomUUID(),
                    entity,
                    schedule.getExecuteAt(),
                    schedule.isTurnOn()
            );
            entity.getSchedules().add(scheduleEntity);
        }

        DeviceEntity saved = deviceJpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Device> findById(UUID id) {
        return deviceJpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Device> findByOwnerId(UUID ownerId) {
        return deviceJpaRepository.findAll().stream()
                .filter(entity -> entity.getOwnerId().equals(ownerId))
                .map(this::toDomain)
                .toList();
    }

    @Override
    public List<Device> findAll() {
        return deviceJpaRepository.findAll().stream()
                .map(this::toDomain)
                .toList();
    }

    @Override
    public void deleteById(UUID id) {
        deviceJpaRepository.deleteById(id);
    }

    private Device toDomain(DeviceEntity entity) {
        Device device = new Device(
                entity.getId(),
                entity.getOwnerId(),
                new DeviceName(entity.getName()),
                new DeviceCode(entity.getCode()),
                DeviceType.valueOf(entity.getType()),
                DeviceStatus.valueOf(entity.getStatus())
        );

        for (DeviceScheduleEntity scheduleEntity : entity.getSchedules()) {
            device.addSchedule(
                    new DeviceSchedule(
                            scheduleEntity.getExecuteAt(),
                            scheduleEntity.isTurnOn()
                    )
            );
        }

        return device;
    }
}