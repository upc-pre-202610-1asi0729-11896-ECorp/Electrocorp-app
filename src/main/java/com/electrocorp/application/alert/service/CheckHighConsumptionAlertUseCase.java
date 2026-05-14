package com.electrocorp.application.alert.service;

import com.electrocorp.domain.alert.model.Alert;
import com.electrocorp.domain.alert.repository.AlertRepository;
import com.electrocorp.domain.energy.model.EnergyReading;
import org.springframework.stereotype.Service;

@Service
public class CheckHighConsumptionAlertUseCase {

    private final AlertRepository alertRepository;
    private final NotificationGateway notificationGateway;

    public CheckHighConsumptionAlertUseCase(
            AlertRepository alertRepository,
            NotificationGateway notificationGateway
    ) {
        this.alertRepository = alertRepository;
        this.notificationGateway = notificationGateway;
    }

    public void execute(EnergyReading reading) {
        if (reading.getAmount().getValue() > 20) {
            Alert alert = alertRepository.save(
                    new Alert(
                            reading.getDeviceId(),
                            "⚠️ Alto consumo detectado para el dispositivo " + reading.getDeviceId()
                    )
            );

            notificationGateway.send(alert.getMessage());
        }
    }
}