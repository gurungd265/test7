# ----------- Stage 1: Build -----------
FROM gradle:8.1.1-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/project
WORKDIR /home/gradle/project
RUN gradle build -x test

# ----------- Stage 2: Run -------------
FROM eclipse-temurin:17-jdk-alpine
EXPOSE 8080
COPY --from=build /home/gradle/project/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
