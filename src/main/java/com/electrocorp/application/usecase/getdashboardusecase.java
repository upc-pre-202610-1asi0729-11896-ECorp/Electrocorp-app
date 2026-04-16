package com.electrocorp.application.usecase;

import com.electrocorp.domain.model.energyreading;
import com.electrocorp.domain.repository.energyrepository;

public class getdashboardusecase {

    private final energyrepository repository;

    public getdashboardusecase(energyrepository repository) {
        this.repository = repository;
    }

    public DashboardResponse execute(String homeId) {

        var readings = repository.getByHome(homeId);

        double totalKwh = readings.stream().mapToDouble(energyreading::getKwh).sum();
        double totalCost = readings.stream().mapToDouble(energyreading::totalCost).sum();

        return new DashboardResponse(totalKwh, totalCost, readings.size());
    }

    public record DashboardResponse(double totalKwh, double totalCost, int records) {}
}