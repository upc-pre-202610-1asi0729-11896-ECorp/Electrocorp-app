package com.electrocorp.interfaces.rest.alert;

import com.electrocorp.infrastructure.persistence.jpa.DeviceEntity;
import com.electrocorp.infrastructure.persistence.jpa.DeviceJpaRepository;
import com.electrocorp.infrastructure.persistence.jpa.EnergyReadingEntity;
import com.electrocorp.infrastructure.persistence.jpa.EnergyReadingJpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final DeviceJpaRepository deviceJpaRepository;
    private final EnergyReadingJpaRepository energyReadingJpaRepository;

    public AlertController(DeviceJpaRepository deviceJpaRepository,
                           EnergyReadingJpaRepository energyReadingJpaRepository) {
        this.deviceJpaRepository = deviceJpaRepository;
        this.energyReadingJpaRepository = energyReadingJpaRepository;
    }

    @GetMapping
    public List<AlertResponse> getAlerts() {
        List<AlertResponse> alerts = new ArrayList<>();

        List<DeviceEntity> devices = deviceJpaRepository.findAll();
        List<EnergyReadingEntity> readings = energyReadingJpaRepository.findAll();

        long activeDevices = devices.stream()
                .filter(d -> "ON".equalsIgnoreCase(d.getStatus()))
                .count();

        if (activeDevices >= 1) {
            alerts.add(new AlertResponse(
                    "ALR-001",
                    "Hay dispositivos encendidos en este momento. Revisa si todos son necesarios."
            ));
        }

        double totalConsumption = readings.stream()
                .mapToDouble(EnergyReadingEntity::getAmount)
                .sum();

        if (totalConsumption >= 5) {
            alerts.add(new AlertResponse(
                    "ALR-002",
                    "El consumo acumulado reciente ya alcanzó " + totalConsumption + " kWh."
            ));
        }

        readings.stream()
                .filter(r -> r.getAmount() >= 5)
                .findFirst()
                .ifPresent(r -> alerts.add(
                        new AlertResponse(
                                "ALR-003",
                                "Se detectó una lectura relevante de " + r.getAmount() + " kWh."
                        )
                ));

        if (devices.isEmpty()) {
            alerts.add(new AlertResponse(
                    "ALR-004",
                    "Aún no hay dispositivos registrados en el sistema."
            ));
        }

        return alerts;
    }

    public record AlertResponse(String id, String message) {
    }
}