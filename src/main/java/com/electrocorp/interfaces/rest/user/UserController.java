package com.electrocorp.interfaces.rest.user;

import com.electrocorp.application.user.command.BlockUserCommand;
import com.electrocorp.application.user.command.CreateAccessProfileCommand;
import com.electrocorp.application.user.command.LoginUserCommand;
import com.electrocorp.application.user.command.RegisterUserCommand;
import com.electrocorp.application.user.dto.AccessProfileRequest;
import com.electrocorp.application.user.dto.LoginRequest;
import com.electrocorp.application.user.dto.UserRequest;
import com.electrocorp.application.user.dto.UserResponse;
import com.electrocorp.application.user.service.BlockUserUseCase;
import com.electrocorp.application.user.service.CreateAccessProfileUseCase;
import com.electrocorp.application.user.service.LoginUserUseCase;
import com.electrocorp.application.user.service.RegisterUserUseCase;
import com.electrocorp.domain.user.model.UserAccount;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final RegisterUserUseCase registerUserUseCase;
    private final BlockUserUseCase blockUserUseCase;
    private final CreateAccessProfileUseCase createAccessProfileUseCase;
    private final LoginUserUseCase loginUserUseCase;

    public UserController(
            RegisterUserUseCase registerUserUseCase,
            BlockUserUseCase blockUserUseCase,
            CreateAccessProfileUseCase createAccessProfileUseCase,
            LoginUserUseCase loginUserUseCase
    ) {
        this.registerUserUseCase = registerUserUseCase;
        this.blockUserUseCase = blockUserUseCase;
        this.createAccessProfileUseCase = createAccessProfileUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }

    @PostMapping
    public UserResponse register(@RequestBody UserRequest request) {
        UserAccount user = registerUserUseCase.execute(
                new RegisterUserCommand(request.fullName, request.email, request.password)
        );
        return toResponse(user);
    }

    @PutMapping("/{userId}/block")
    public UserResponse block(@PathVariable UUID userId) {
        return toResponse(blockUserUseCase.execute(new BlockUserCommand(userId)));
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {
        UserAccount user = loginUserUseCase.execute(
                new LoginUserCommand(request.email, request.password)
        );
        return toResponse(user);
    }

    @PostMapping("/{userId}/profiles")
    public UserResponse addProfile(@PathVariable UUID userId, @RequestBody AccessProfileRequest request) {
        return toResponse(
                createAccessProfileUseCase.execute(
                        new CreateAccessProfileCommand(
                                userId,
                                request.fullName,
                                request.email,
                                request.accessLevel
                        )
                )
        );
    }

    private UserResponse toResponse(UserAccount user) {
        UserResponse response = new UserResponse();
        response.id = user.getId();
        response.fullName = user.getFullName().getValue();
        response.email = user.getEmail().getValue();
        response.blocked = user.isBlocked();
        return response;
    }
}