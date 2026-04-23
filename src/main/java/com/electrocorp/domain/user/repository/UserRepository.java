package com.electrocorp.domain.user.repository;

import com.electrocorp.domain.user.model.UserAccount;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    UserAccount save(UserAccount user);
    Optional<UserAccount> findById(UUID id);
    Optional<UserAccount> findByEmail(String email);
    List<UserAccount> findAll();
}