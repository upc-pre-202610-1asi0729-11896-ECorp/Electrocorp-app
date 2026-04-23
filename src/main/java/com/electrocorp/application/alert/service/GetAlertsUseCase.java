package com.electrocorp.application.alert.service;

import com.electrocorp.domain.alert.model.Alert;
import com.electrocorp.domain.alert.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetAlertsUseCase {

    private final AlertRepository alertRepository;

    public GetAlertsUseCase(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public List<Alert> execute() {
        return alertRepository.findAll();
    }
}