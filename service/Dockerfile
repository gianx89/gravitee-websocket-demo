FROM adoptopenjdk/openjdk11:x86_64-alpine-jdk-11.0.14.1_1
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:resolve
COPY src ./src
CMD ["./mvnw", "spring-boot:run"]
