package com.electrocorp.interfaces.rest.shared;

import com.electrocorp.domain.shared.DomainException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DomainException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleDomainException(DomainException ex) {
        return Map.of(
                "timestamp", LocalDateTime.now(),
                "error", "DOMAIN_ERROR",
                "message", ex.getMessage()
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleIllegalArgumentException(IllegalArgumentException ex) {
        return Map.of(
                "timestamp", LocalDateTime.now(),
                "error", "INVALID_ARGUMENT",
                "message", ex.getMessage()
        );
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleGeneralException(Exception ex) {
        return Map.of(
                "timestamp", LocalDateTime.now(),
                "error", "INTERNAL_ERROR",
                "message", ex.getMessage()
        );
    }
}