package com.electrocorp.application.energy.service;

import com.electrocorp.domain.energy.model.EnergyReading;
import com.electrocorp.domain.energy.repository.EnergyReadingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetEnergyReadingsUseCase {

    private final EnergyReadingRepository energyReadingRepository;

    public GetEnergyReadingsUseCase(EnergyReadingRepository energyReadingRepository) {
        this.energyReadingRepository = energyReadingRepository;
    }

    public List<EnergyReading> execute() {
        return energyReadingRepository.findAll();
    }
}