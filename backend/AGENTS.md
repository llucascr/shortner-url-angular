# Project

`url-shortener` is a REST API for creating temporary shortened URLs and resolving
their short codes. A newly created mapping receives a random, six-character code
and expires after seven days.

Current HTTP contract:

- `POST /api?url={originalUrl}` creates a mapping and returns `201 Created` with
  `originalUrl`, `shortenerUrl`, and `expiredAt`.
- `GET /api/{shortCode}` resolves a non-expired mapping and returns `302 Found`
  with the original URL in the `Location` header.
- The H2 development console is available at `/h2-console` while the application
  is running.

The application currently uses an in-memory database, so all mappings are lost
when the process stops. Note that `UrlService` currently builds response URLs as
`http://localhost:8080/{shortCode}`, while the implemented redirect route is
`/api/{shortCode}`. Preserve neither side of this mismatch accidentally: changes
to the public URL must keep the response and controller route consistent.

# Stack

- Java 21
- Spring Boot 4.1.1
- Spring Web MVC for the REST API
- Spring Data JPA and Hibernate for persistence
- H2 in-memory database for local development and tests
- Maven Wrapper 3.9.16 (`./mvnw`)
- JUnit 5 and Spring Boot test support

# Architecture

The code follows a small layered architecture under
`com.desafio.url_shortener`:

- `controller`: defines HTTP routes, status codes, request binding, and redirect
  responses. Controllers delegate business behavior to services.
- `service`: owns the shortening and resolution use cases, code generation,
  uniqueness checks, and expiration rules.
- `repository`: Spring Data JPA interfaces responsible for persistence queries.
- `domain/entity`: JPA persistence entities and table mappings.
- `dto`: immutable API response models. Do not expose JPA entities directly from
  controllers.

Request flow:

`HTTP request -> UrlMappingController -> UrlService -> UrlMappingRepository -> H2`

The application entry point is `UrlShortenerApplication`. Runtime configuration
lives in `src/main/resources/application.properties`, and manual request examples
live in `http/UrlMapping.http`.

# General rules

- Keep all Java code in the `com.desafio.url_shortener` package hierarchy; the
  hyphenated artifact name is not a valid Java package name.
- Preserve layer boundaries: controllers handle HTTP, services contain business
  rules, and repositories contain persistence access.
- Prefer constructor injection. Do not add field injection.
- Use DTOs or records for API input/output and keep persistence details out of
  the public contract.
- Keep the short-code uniqueness invariant in both application logic and the
  database constraint on `url_mapping.short_code`.
- Treat expiration as a domain rule. Any alternative clock or expiration policy
  should be injectable/testable rather than duplicated across layers.
- Validate externally supplied URLs before persistence. When adding API error
  handling, return explicit HTTP statuses for invalid input, missing codes, and
  expired mappings instead of leaking generic exceptions.
- Do not hard-code deployment-specific base URLs in new code. Read them from
  configuration, and keep generated short URLs aligned with the redirect route.
- Add or update tests for every behavior change. Prefer focused unit tests for
  service rules and MVC/integration tests for routes, status codes, headers, and
  persistence behavior.
- Keep tests deterministic: do not assert a specific random short code or depend
  on the wall clock without controlling those collaborators.
- Do not commit generated output from `target/`, IDE metadata, credentials, or
  machine-specific configuration.
- Keep `http/UrlMapping.http` synchronized with the actual API and use neutral
  example URLs rather than private or session-specific links.
- Follow the existing Java formatting style (four-space indentation, one public
  top-level type per file) and use clear domain-oriented names.

# Commands

Run commands from the repository root. Use the checked-in Maven Wrapper instead
of relying on a globally installed Maven version.

```bash
# Run the full test suite
./mvnw test

# Clean, compile, test, and verify the project
./mvnw clean verify

# Start the API locally on the default port (8080)
./mvnw spring-boot:run

# Build the executable JAR
./mvnw clean package

# Run the packaged application
java -jar target/url-shortener-0.0.1-SNAPSHOT.jar

# Run one test class
./mvnw -Dtest=UrlShortenerApplicationTests test
```

Manual smoke test while the application is running:

```bash
curl -i -X POST 'http://localhost:8080/api?url=https%3A%2F%2Fexample.com'
curl -i 'http://localhost:8080/api/{shortCode}'
```
