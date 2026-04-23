package com.electrocorp.domain.user.model;

import com.electrocorp.domain.user.valueobject.AccessLevel;
import com.electrocorp.domain.user.valueobject.Email;
import com.electrocorp.domain.user.valueobject.FullName;

import java.util.UUID;

public class AccessProfile {
    private UUID id;
    private FullName fullName;
    private Email email;
    private AccessLevel accessLevel;

    public AccessProfile(FullName fullName, Email email, AccessLevel accessLevel) {
        this.id = UUID.randomUUID();
        this.fullName = fullName;
        this.email = email;
        this.accessLevel = accessLevel;
    }

    public UUID getId() {
        return id;
    }

    public FullName getFullName() {
        return fullName;
    }

    public Email getEmail() {
        return email;
    }

    public AccessLevel getAccessLevel() {
        return accessLevel;
    }
}