package com.desafio.url_shortener.repository;

import com.desafio.url_shortener.domain.entity.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {

    boolean existsByShortCode(String shortCode);

    Optional<UrlMapping> findByShortCode(String shortCode);

}
