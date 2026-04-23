package com.electrocorp.application.energy.service;

import com.electrocorp.application.energy.command.RegisterEnergyReadingCommand;
import com.electrocorp.domain.energy.model.EnergyReading;
import com.electrocorp.domain.energy.repository.EnergyReadingRepository;
import com.electrocorp.domain.energy.valueobject.EnergyAmount;
import org.springframework.stereotype.Service;

@Service
public class RegisterEnergyReadingUseCase {

    private final EnergyReadingRepository energyReadingRepository;

    public RegisterEnergyReadingUseCase(EnergyReadingRepository energyReadingRepository) {
        this.energyReadingRepository = energyReadingRepository;
    }

    public EnergyReading execute(RegisterEnergyReadingCommand command) {
        EnergyReading reading = new EnergyReading(
                command.deviceId(),
                new EnergyAmount(command.amount())
        );

        return energyReadingRepository.save(reading);
    }
}