package com.electrocorp.domain.user.model;

import com.electrocorp.domain.shared.AggregateRoot;
import com.electrocorp.domain.user.valueobject.Email;
import com.electrocorp.domain.user.valueobject.FullName;
import com.electrocorp.domain.user.valueobject.PasswordHash;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class UserAccount extends AggregateRoot {

    private Email email;
    private FullName fullName;
    private PasswordHash passwordHash;
    private boolean blocked;
    private final List<AccessProfile> accessProfiles;

    public UserAccount(Email email, FullName fullName, PasswordHash passwordHash) {
        this.id = UUID.randomUUID();
        this.email = email;
        this.fullName = fullName;
        this.passwordHash = passwordHash;
        this.blocked = false;
        this.accessProfiles = new ArrayList<>();
    }

    public void block() {
        this.blocked = true;
    }

    public void addAccessProfile(AccessProfile profile) {
        this.accessProfiles.add(profile);
    }

    public Email getEmail() {
        return email;
    }

    public FullName getFullName() {
        return fullName;
    }

    public PasswordHash getPasswordHash() {
        return passwordHash;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public List<AccessProfile> getAccessProfiles() {
        return List.copyOf(accessProfiles);
    }
}