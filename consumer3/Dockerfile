# Stage 1: Build the project
FROM gradle:7-jdk17 AS builder

WORKDIR /app

COPY . .

RUN gradle clean build

# Stage 2: Run the project
FROM openjdk:17-jdk-slim

WORKDIR /app

# Install curl
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/build/libs/app.jar app.jar

CMD ["java", "-jar", "app.jar"]

EXPOSE 8080