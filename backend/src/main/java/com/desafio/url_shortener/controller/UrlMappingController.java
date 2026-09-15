package com.desafio.url_shortener.controller;

import com.desafio.url_shortener.dto.UrlMappingResponse;
import com.desafio.url_shortener.service.UrlService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class UrlMappingController {

    private final UrlService urlService;

    public UrlMappingController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UrlMappingResponse shortenUrl(@RequestParam String url) {
        return urlService.shortenUrl(url);
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
