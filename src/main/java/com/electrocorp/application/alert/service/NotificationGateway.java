package com.electrocorp.application.alert.service;

public interface NotificationGateway {
    void send(String message);
}