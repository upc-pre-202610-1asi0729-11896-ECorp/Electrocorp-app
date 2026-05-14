package com.electrocorp.infrastructure.external.notification;

import com.electrocorp.application.alert.service.NotificationGateway;
import org.springframework.stereotype.Service;

@Service
public class ConsoleNotificationService implements NotificationGateway {

    @Override
    public void send(String message) {
        System.out.println("NOTIFICATION SENT: " + message);
    }
}