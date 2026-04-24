package com.electrocorp.application.user.service;

import com.electrocorp.application.user.command.CreateAccessProfileCommand;
import com.electrocorp.domain.shared.DomainException;
import com.electrocorp.domain.user.model.AccessProfile;
import com.electrocorp.domain.user.model.UserAccount;
import com.electrocorp.domain.user.repository.UserRepository;
import com.electrocorp.domain.user.valueobject.AccessLevel;
import com.electrocorp.domain.user.valueobject.Email;
import com.electrocorp.domain.user.valueobject.FullName;
import org.springframework.stereotype.Service;

@Service
public class CreateAccessProfileUseCase {

    private final UserRepository userRepository;

    public CreateAccessProfileUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserAccount execute(CreateAccessProfileCommand command) {
        UserAccount user = userRepository.findById(command.userId())
                .orElseThrow(() -> new DomainException("Usuario no encontrado"));

        user.addAccessProfile(
                new AccessProfile(
                        new FullName(command.fullName()),
                        new Email(command.email()),
                        AccessLevel.valueOf(command.accessLevel())
                )
        );

        return userRepository.save(user);
    }
}