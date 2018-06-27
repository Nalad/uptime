FROM openjdk:8-jdk-alpine as builder
ENV APP_HOME=/root/dev/myapp/
RUN mkdir -p $APP_HOME/src/main/java
WORKDIR $APP_HOME
COPY build.gradle gradlew gradlew.bat $APP_HOME
COPY gradle $APP_HOME/gradle
# download dependencies
RUN ./gradlew
COPY . .
RUN ./gradlew build

FROM openjdk:8-jre-alpine
WORKDIR /root/
COPY --from=builder /root/dev/myapp/build/libs/pompom-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "pompom-0.0.1-SNAPSHOT.jar"]
