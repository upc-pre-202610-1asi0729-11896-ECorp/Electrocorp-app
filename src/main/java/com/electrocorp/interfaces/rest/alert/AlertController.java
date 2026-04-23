package com.electrocorp.interfaces.rest.alert;

import com.electrocorp.application.alert.dto.AlertResponse;
import com.electrocorp.application.alert.service.GetAlertsUseCase;
import com.electrocorp.domain.alert.model.Alert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final GetAlertsUseCase getAlertsUseCase;

    public AlertController(GetAlertsUseCase getAlertsUseCase) {
        this.getAlertsUseCase = getAlertsUseCase;
    }

    @GetMapping
    public List<AlertResponse> getAlerts() {
        return getAlertsUseCase.execute().stream().map(this::toResponse).toList();
    }

    private AlertResponse toResponse(Alert alert) {
        AlertResponse response = new AlertResponse();
        response.id = alert.getId();
        response.deviceId = alert.getDeviceId();
        response.message = alert.getMessage();
        response.createdAt = alert.getCreatedAt();
        return response;
    }
}