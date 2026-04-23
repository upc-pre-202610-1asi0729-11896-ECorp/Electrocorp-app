package com.electrocorp.application.user.service;

import com.electrocorp.application.user.command.RegisterUserCommand;
import com.electrocorp.domain.user.model.UserAccount;
import com.electrocorp.domain.user.repository.UserRepository;
import com.electrocorp.domain.user.valueobject.Email;
import com.electrocorp.domain.user.valueobject.FullName;
import com.electrocorp.domain.user.valueobject.PasswordHash;
import org.springframework.stereotype.Service;

@Service
public class RegisterUserUseCase {

    private final UserRepository userRepository;

    public RegisterUserUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserAccount execute(RegisterUserCommand command) {
        UserAccount user = new UserAccount(
                new Email(command.email()),
                new FullName(command.fullName()),
                new PasswordHash(command.password())
        );

        return userRepository.save(user);
    }
}