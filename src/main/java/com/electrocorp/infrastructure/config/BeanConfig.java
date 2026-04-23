package com.electrocorp.infrastructure.config;

import com.electrocorp.domain.alert.repository.AlertRepository;
import com.electrocorp.domain.device.repository.DeviceRepository;
import com.electrocorp.domain.energy.repository.EnergyReadingRepository;
import com.electrocorp.domain.user.repository.UserRepository;
import com.electrocorp.infrastructure.persistence.jpa.InMemoryAlertRepository;
import com.electrocorp.infrastructure.persistence.jpa.InMemoryDeviceRepository;
import com.electrocorp.infrastructure.persistence.jpa.InMemoryEnergyReadingRepository;
import com.electrocorp.infrastructure.persistence.jpa.InMemoryUserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public DeviceRepository deviceRepository() {
        return new InMemoryDeviceRepository();
    }

    @Bean
    public UserRepository userRepository() {
        return new InMemoryUserRepository();
    }

    @Bean
    public EnergyReadingRepository energyReadingRepository() {
        return new InMemoryEnergyReadingRepository();
    }

    @Bean
    public AlertRepository alertRepository() {
        return new InMemoryAlertRepository();
    }
}