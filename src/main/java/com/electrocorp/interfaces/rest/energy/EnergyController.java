package com.electrocorp.interfaces.rest.energy;

import com.electrocorp.application.alert.service.CheckHighConsumptionAlertUseCase;
import com.electrocorp.application.energy.command.RegisterEnergyReadingCommand;
import com.electrocorp.application.energy.dto.EnergyReadingRequest;
import com.electrocorp.application.energy.dto.EnergyReadingResponse;
import com.electrocorp.application.energy.service.GetEnergyReadingsUseCase;
import com.electrocorp.application.energy.service.GetEnergyRecommendationsUseCase;
import com.electrocorp.application.energy.service.RegisterEnergyReadingUseCase;
import com.electrocorp.domain.energy.model.EnergyReading;
import com.electrocorp.domain.energy.model.EnergyRecommendation;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/energy")
public class EnergyController {

    private final RegisterEnergyReadingUseCase registerEnergyReadingUseCase;
    private final GetEnergyReadingsUseCase getEnergyReadingsUseCase;
    private final GetEnergyRecommendationsUseCase getEnergyRecommendationsUseCase;
    private final CheckHighConsumptionAlertUseCase checkHighConsumptionAlertUseCase;

    public EnergyController(
            RegisterEnergyReadingUseCase registerEnergyReadingUseCase,
            GetEnergyReadingsUseCase getEnergyReadingsUseCase,
            GetEnergyRecommendationsUseCase getEnergyRecommendationsUseCase,
            CheckHighConsumptionAlertUseCase checkHighConsumptionAlertUseCase
    ) {
        this.registerEnergyReadingUseCase = registerEnergyReadingUseCase;
        this.getEnergyReadingsUseCase = getEnergyReadingsUseCase;
        this.getEnergyRecommendationsUseCase = getEnergyRecommendationsUseCase;
        this.checkHighConsumptionAlertUseCase = checkHighConsumptionAlertUseCase;
    }

    @PostMapping("/readings")
    public EnergyReadingResponse registerReading(@RequestBody EnergyReadingRequest request) {
        EnergyReading reading = registerEnergyReadingUseCase.execute(
                new RegisterEnergyReadingCommand(
                        UUID.fromString(request.deviceId),
                        request.amount
                )
        );

        checkHighConsumptionAlertUseCase.execute(reading);

        EnergyReadingResponse response = new EnergyReadingResponse();
        response.id = reading.getId();
        response.deviceId = reading.getDeviceId();
        response.amount = reading.getAmount().getValue();
        response.recordedAt = reading.getRecordedAt();
        return response;
    }

    @GetMapping("/readings")
    public List<EnergyReadingResponse> getReadings() {
        return getEnergyReadingsUseCase.execute().stream().map(reading -> {
            EnergyReadingResponse response = new EnergyReadingResponse();
            response.id = reading.getId();
            response.deviceId = reading.getDeviceId();
            response.amount = reading.getAmount().getValue();
            response.recordedAt = reading.getRecordedAt();
            return response;
        }).toList();
    }

    @GetMapping("/recommendations")
    public List<String> getRecommendations() {
        return getEnergyRecommendationsUseCase.execute()
                .stream()
                .map(EnergyRecommendation::getMessage)
                .toList();
    }
}