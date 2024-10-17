# syntax=docker/dockerfile:1

# Stage 1: Resolve dependencies and cache them
FROM eclipse-temurin:17-jdk-jammy AS deps
WORKDIR /build
COPY --chmod=0755 mvnw mvnw
COPY .mvn/ .mvn/
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 ./mvnw dependency:go-offline -DskipTests

# Stage 2: Build the application
FROM deps AS build
WORKDIR /build
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw package -DskipTests && \
    mv target/*.jar app.jar

# Stage 3: Prepare the runtime environment
FROM eclipse-temurin:17-jre-jammy AS final

# Create a non-privileged user for security
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

# Copy the built JAR directly from the build stage
WORKDIR /app
COPY --from=build /build/app.jar app.jar

# Expose the application port and start it
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
