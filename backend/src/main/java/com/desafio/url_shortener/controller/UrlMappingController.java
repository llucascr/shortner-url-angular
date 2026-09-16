package com.desafio.url_shortener.controller;

import com.desafio.url_shortener.service.UrlService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RateLimiter(name = "url")
@RequestMapping("/api")
public class UrlMappingController {

    private final UrlService urlService;

    @PostMapping("/short")
    @CrossOrigin(origins = "${app.cors.allowed-origins}")
    @ResponseStatus(HttpStatus.CREATED)
    public String shortenUrl(@RequestParam String url) {
        return urlService.shortenUrl(url).shortenerUrl();
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> getOriginalUrl(@PathVariable String shortCode) {
        String url = urlService.getOriginalUrl(shortCode);
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .location(URI.create(url))
                .build();
    }

}
