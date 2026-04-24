package com.electrocorp.application.user.service;

import com.electrocorp.application.user.command.BlockUserCommand;
import com.electrocorp.domain.shared.DomainException;
import com.electrocorp.domain.user.model.UserAccount;
import com.electrocorp.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class BlockUserUseCase {

    private final UserRepository userRepository;

    public BlockUserUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserAccount execute(BlockUserCommand command) {
        UserAccount user = userRepository.findById(command.userId())
                .orElseThrow(() -> new DomainException("Usuario no encontrado"));

        user.block();
        return userRepository.save(user);
    }
}