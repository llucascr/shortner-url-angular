package com.desafio.url_shortener.dto;

import com.desafio.url_shortener.domain.entity.UrlMapping;

import java.time.LocalDateTime;

public record UrlMappingResponse(
        String originalUrl,
        String shortenerUrl,
        LocalDateTime expiredAt,
        String code
) {
}
