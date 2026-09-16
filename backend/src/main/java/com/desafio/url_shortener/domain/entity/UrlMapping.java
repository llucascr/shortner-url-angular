package com.desafio.url_shortener.domain.entity;

import com.desafio.url_shortener.dto.UrlMappingResponse;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "url_mapping")
public class UrlMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "short_code", unique = true)
    private String shortCode;

    @Column(name = "original_url", columnDefinition = "TEXT")
    private String originalUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    public UrlMappingResponse toResponse(String shortenerUrl) {
        return new UrlMappingResponse(
                this.originalUrl,
                shortenerUrl,
                this.expiresAt,
                this.shortCode
        );
    }

}
