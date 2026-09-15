package com.desafio.url_shortener.dto;

import java.time.LocalDateTime;

public record UrlMappingResponse(
        String originalUrl,
        String shortenerUrl,
        LocalDateTime expiredAt,
        String code
) {
}
