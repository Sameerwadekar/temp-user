# Stage 1: Build the Spring Boot application (Maven)
FROM eclipse-temurin:17-jdk-focal AS builder

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw && ./mvnw dependency:go-offline

COPY src src

RUN ./mvnw package -DskipTests


FROM eclipse-temurin:17-jre-focal

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "app.jar"]
