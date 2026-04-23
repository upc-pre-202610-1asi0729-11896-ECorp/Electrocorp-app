package com.electrocorp.application.user.command;

public record RegisterUserCommand(String fullName, String email, String password) {
}