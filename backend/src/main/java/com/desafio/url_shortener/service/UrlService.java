package com.desafio.url_shortener.service;

import com.desafio.url_shortener.domain.entity.UrlMapping;
import com.desafio.url_shortener.dto.UrlMappingResponse;
import com.desafio.url_shortener.exception.DataNotFound;
import com.desafio.url_shortener.repository.UrlMappingRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UrlService {

    private final UrlMappingRepository urlMappingRepository;
    private final SecureRandom random = new SecureRandom();

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int SHORT_CODE_LENGTH = 6;
    private static final int EXPIRATION_DAYS = 7;

    public UrlMappingResponse shortenUrl(String originalUrl) {

        Optional<UrlMapping> existingUrl = urlMappingRepository.findByOriginalUrl(originalUrl);

        if (existingUrl.isPresent()) {
            UrlMapping urlMapping = existingUrl.get();
            String shortenerUrl = buildShortenedUrl(urlMapping);

            return urlMapping.toResponse(shortenerUrl);
        }

        UrlMapping shortUrl = UrlMapping.builder()
                .originalUrl(originalUrl)
                .shortCode(generateUniqueShortCode())
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(EXPIRATION_DAYS))
                .build();

        UrlMapping savedUrlMapping = urlMappingRepository.save(shortUrl);
        String shortenerUrl = buildShortenedUrl(savedUrlMapping);

        return savedUrlMapping.toResponse(shortenerUrl);
    }

    private String buildShortenedUrl(UrlMapping savedUrlMapping) {
       return "http://localhost:8080/api/" + savedUrlMapping.getShortCode();
    }

    public String getOriginalUrl(String shortCode) {

        UrlMapping shortUrl = urlMappingRepository.findByShortCode(shortCode).orElseThrow(
                () -> new RuntimeException("URL não encontrada"));

        if (shortUrl.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("URL expirada");
        }

        return shortUrl.getOriginalUrl();
    }

    private String generateUniqueShortCode() {

        String shortCode;

        do {
            shortCode = generateShortCode();
        } while (urlMappingRepository.existsByShortCode(shortCode));

        return shortCode;
    }

    private String generateShortCode() {

        StringBuilder code = new StringBuilder();

        for (int i = 0; i < SHORT_CODE_LENGTH; i++) {

            int randomIndex = random.nextInt(CHARACTERS.length());

            code.append(
                    CHARACTERS.charAt(randomIndex)
            );
        }

        return code.toString();
    }

}
