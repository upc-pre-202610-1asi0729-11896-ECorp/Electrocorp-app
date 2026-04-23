package com.electrocorp.application.alert.service;

import com.electrocorp.domain.alert.model.Alert;
import com.electrocorp.domain.alert.repository.AlertRepository;
import com.electrocorp.domain.energy.model.EnergyReading;
import org.springframework.stereotype.Service;

@Service
public class CheckHighConsumptionAlertUseCase {

    private final AlertRepository alertRepository;

    public CheckHighConsumptionAlertUseCase(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public void execute(EnergyReading reading) {
        if (reading.getAmount().getValue() > 20) {
            alertRepository.save(
                    new Alert(
                            reading.getDeviceId(),
                            "⚠️ Alto consumo detectado para el dispositivo " + reading.getDeviceId()
                    )
            );
        }
    }
}