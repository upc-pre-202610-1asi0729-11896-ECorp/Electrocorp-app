package com.electrocorp.infrastructure.persistence;

import com.electrocorp.domain.model.energyreading;
import com.electrocorp.domain.repository.energyrepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class inmemoryenergyrepository implements energyrepository {

    private final List<energyreading> data = new ArrayList<>();

    @Override
    public void save(energyreading reading) {
        data.add(reading);
    }

    @Override
    public List<energyreading> getByHome(String homeId) {
        return data.stream()
                .filter(r -> r.getHomeId().equals(homeId))
                .collect(Collectors.toList());
    }
}