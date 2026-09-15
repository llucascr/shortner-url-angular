package com.desafio.url_shortener.service;

import com.desafio.url_shortener.domain.entity.UrlMapping;
import com.desafio.url_shortener.dto.UrlMappingResponse;
import com.desafio.url_shortener.repository.UrlMappingRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class UrlService {

    private final UrlMappingRepository urlMappingRepository;
    private final SecureRandom random = new SecureRandom();

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int SHORT_CODE_LENGTH = 6;
    private static final int EXPIRATION_DAYS = 7;

    public UrlService(UrlMappingRepository urlMappingRepository) {
        this.urlMappingRepository = urlMappingRepository;
    }

    public UrlMappingResponse shortenUrl(String originalUrl) {

        String shortCode = generateUniqueShortCode();

        UrlMapping shortUrl = new UrlMapping();

        shortUrl.setOriginalUrl(originalUrl);
        shortUrl.setShortCode(shortCode);
        shortUrl.setCreatedAt(LocalDateTime.now());
        shortUrl.setExpiresAt(
                LocalDateTime.now().plusDays(EXPIRATION_DAYS)
        );

        UrlMapping savedUrlMapping = urlMappingRepository.save(shortUrl);

        String shortenerUrl = "http://localhost:8080/" + savedUrlMapping.getShortCode();

        return new UrlMappingResponse(
                savedUrlMapping.getOriginalUrl(),
                shortenerUrl,
                savedUrlMapping.getExpiresAt(),
                savedUrlMapping.getShortCode()
        );
    }

    public String getOriginalUrl(String shortCode) {

        UrlMapping shortUrl = urlMappingRepository
                .findByShortCode(shortCode)
                .orElseThrow(() ->
                        new RuntimeException("URL não encontrada")
                );

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
