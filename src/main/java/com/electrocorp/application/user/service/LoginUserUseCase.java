package com.electrocorp.application.user.service;

import com.electrocorp.application.user.command.LoginUserCommand;
import com.electrocorp.domain.shared.DomainException;
import com.electrocorp.domain.user.model.UserAccount;
import com.electrocorp.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class LoginUserUseCase {

    private final UserRepository userRepository;

    public LoginUserUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserAccount execute(LoginUserCommand command) {
        UserAccount user = userRepository.findByEmail(command.email())
                .orElseThrow(() -> new DomainException("Credenciales inválidas"));

        if (!user.getPasswordHash().getValue().equals(command.password())) {
            throw new DomainException("Credenciales inválidas");
        }

        if (user.isBlocked()) {
            throw new DomainException("El usuario está bloqueado");
        }

        return user;
    }
}