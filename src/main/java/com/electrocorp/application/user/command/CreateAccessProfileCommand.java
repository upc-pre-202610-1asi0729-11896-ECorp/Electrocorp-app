package com.electrocorp.application.user.command;

import java.util.UUID;

public record CreateAccessProfileCommand(
        UUID userId,
        String fullName,
        String email,
        String accessLevel
) {
}