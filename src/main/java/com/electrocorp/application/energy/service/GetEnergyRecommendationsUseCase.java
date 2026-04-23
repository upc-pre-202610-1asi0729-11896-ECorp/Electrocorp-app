package com.electrocorp.application.energy.service;

import com.electrocorp.domain.energy.model.EnergyReading;
import com.electrocorp.domain.energy.model.EnergyRecommendation;
import com.electrocorp.domain.energy.repository.EnergyReadingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GetEnergyRecommendationsUseCase {

    private final EnergyReadingRepository energyReadingRepository;

    public GetEnergyRecommendationsUseCase(EnergyReadingRepository energyReadingRepository) {
        this.energyReadingRepository = energyReadingRepository;
    }

    public List<EnergyRecommendation> execute() {
        List<EnergyReading> readings = energyReadingRepository.findAll();
        List<EnergyRecommendation> recommendations = new ArrayList<>();

        double total = readings.stream()
                .mapToDouble(r -> r.getAmount().getValue())
                .sum();

        if (total > 100) {
            recommendations.add(new EnergyRecommendation("⚠️ Se detectó un consumo acumulado alto."));
            recommendations.add(new EnergyRecommendation("💡 Considera apagar equipos en horas no operativas."));
        } else {
            recommendations.add(new EnergyRecommendation("✅ Tu consumo se mantiene en un rango saludable."));
        }

        return recommendations;
    }
}