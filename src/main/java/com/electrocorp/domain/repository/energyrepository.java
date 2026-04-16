package com.electrocorp.domain.repository;

import com.electrocorp.domain.model.energyreading;
import java.util.List;

public interface energyrepository {

    void save(energyreading reading);

    List<energyreading> getByHome(String homeId);
}