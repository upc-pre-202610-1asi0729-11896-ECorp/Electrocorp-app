package com.electrocorp.interfaces.rest.user;

import com.electrocorp.application.user.command.RegisterUserCommand;
import com.electrocorp.application.user.dto.UserRequest;
import com.electrocorp.application.user.dto.UserResponse;
import com.electrocorp.application.user.service.RegisterUserUseCase;
import com.electrocorp.domain.user.model.UserAccount;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final RegisterUserUseCase registerUserUseCase;

    public UserController(RegisterUserUseCase registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }

    @PostMapping
    public UserResponse register(@RequestBody UserRequest request) {
        UserAccount user = registerUserUseCase.execute(
                new RegisterUserCommand(
                        request.fullName,
                        request.email,
                        request.password
                )
        );

        UserResponse response = new UserResponse();
        response.id = user.getId();
        response.fullName = user.getFullName().getValue();
        response.email = user.getEmail().getValue();
        response.blocked = user.isBlocked();

        return response;
    }
}