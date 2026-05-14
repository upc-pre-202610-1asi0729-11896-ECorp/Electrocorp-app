package com.electrocorp.infrastructure.config;

import com.electrocorp.domain.alert.repository.AlertRepository;
import com.electrocorp.domain.device.repository.DeviceRepository;
import com.electrocorp.domain.energy.repository.EnergyReadingRepository;
import com.electrocorp.domain.user.repository.UserRepository;
import com.electrocorp.infrastructure.persistence.jpa.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public DeviceRepository deviceRepository(DeviceJpaRepository deviceJpaRepository) { return new JpaDeviceRepositoryAdapter(deviceJpaRepository); }

    @Bean
    public UserRepository userRepository() {
        return new InMemoryUserRepository();
    }

    @Bean
    public EnergyReadingRepository energyReadingRepository(EnergyReadingJpaRepository energyReadingJpaRepository) {return new JpaEnergyReadingRepositoryAdapter(energyReadingJpaRepository); }

    @Bean
    public AlertRepository alertRepository() {
        return new InMemoryAlertRepository();
    }
}