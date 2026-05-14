package com.electrocorp.infrastructure.persistence.jpa;

import com.electrocorp.domain.user.model.UserAccount;
import com.electrocorp.domain.user.repository.UserRepository;

import java.util.*;

public class InMemoryUserRepository implements UserRepository {

    private final Map<UUID, UserAccount> storage = new HashMap<>();

    @Override
    public UserAccount save(UserAccount user) {
        storage.put(user.getId(), user);
        return user;
    }

    @Override
    public Optional<UserAccount> findById(UUID id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public Optional<UserAccount> findByEmail(String email) {
        return storage.values().stream()
                .filter(user -> user.getEmail().getValue().equalsIgnoreCase(email))
                .findFirst();
    }

    @Override
    public List<UserAccount> findAll() {
        return new ArrayList<>(storage.values());
    }
}