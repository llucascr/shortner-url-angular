package com.desafio.url_shortener.exception;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorResponse(
        LocalDateTime timestamp,
        Integer status,
        String error,
        List<String> mensagens
) {
}
