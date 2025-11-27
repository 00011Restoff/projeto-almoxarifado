# Java 21 Technical Reference

## System Information

### Installation Details
```
JDK Installation: OpenJDK 21.0.9+10
Build Date: 2025-10-21
Path: /usr/lib/jvm/java-21-openjdk-amd64
Distribution: Ubuntu 24.04.3 LTS
```

### Version Information
```
openjdk version "21.0.9" 2025-10-21
OpenJDK Runtime Environment (build 21.0.9+10-Ubuntu-124.04)
OpenJDK 64-Bit Server VM (build 21.0.9+10-Ubuntu-124.04, mixed mode, sharing)
```

## Project Configuration

### Maven Build Information
```
Build Tool: Maven 3.8.7
Project: almoxarifado-backend v0.0.1-SNAPSHOT
Parent POM: spring-boot-starter-parent v3.5.6
Compiler Plugin: maven-compiler-plugin v3.14.0
```

### Java Compiler Settings
```xml
<properties>
    <java.version>21</java.version>
    <spring-boot.version>3.5.6</spring-boot.version>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
</properties>
```

## Dependency Versions

### Core Framework
| Dependency | Version | Group ID |
|------------|---------|----------|
| Spring Boot Starter Parent | 3.5.6 | org.springframework.boot |
| Spring Cache | 3.5.6 (inherited) | org.springframework.boot |
| Spring Data JPA | 3.5.6 (inherited) | org.springframework.boot |
| Spring Data Redis | 3.5.6 (inherited) | org.springframework.boot |
| Spring Web | 3.5.6 (inherited) | org.springframework.boot |
| Spring Security | 3.5.6 (inherited) | org.springframework.boot |

### Database & ORM
| Dependency | Version | Group ID |
|------------|---------|----------|
| PostgreSQL Driver | 42.7.4 | org.postgresql |
| H2 Database | 2.2.230 | com.h2database |
| Spring Data JPA | (inherited) | org.springframework.data |

### Security & Tokens
| Dependency | Version | Group ID |
|------------|---------|----------|
| JJWT API | 0.11.5 | io.jsonwebtoken |
| JJWT Impl | 0.11.5 | io.jsonwebtoken |
| JJWT Jackson | 0.11.5 | io.jsonwebtoken |

### Utilities
| Dependency | Version | Group ID |
|------------|---------|----------|
| Jackson DataBind | 2.17.3 (inherited) | com.fasterxml.jackson.core |
| Lombok | 1.18.30 (inherited) | org.projectlombok |
| Apache POI | 5.0.0 | org.apache.poi |
| Apache POI OOXML | 5.0.0 | org.apache.poi |

### Development Tools
| Dependency | Version | Group ID |
|------------|---------|----------|
| Spring Boot DevTools | 3.5.6 (inherited) | org.springframework.boot |
| Spring Boot Test | 3.5.6 (inherited) | org.springframework.boot |
| JUnit 5 | 5.10.3 (inherited) | org.junit.jupiter |

## Build Artifacts

### Final JAR Configuration
```
Filename: almoxarifado-backend-0.0.1-SNAPSHOT.jar
Size: 112M
Type: Spring Boot Executable JAR
Location: target/
Compression: DEFLATE
Structure: 
  ├── META-INF/
  │   ├── MANIFEST.MF
  │   ├── spring.factories
  │   └── maven/
  ├── org/springframework/...
  ├── BOOT-INF/
  │   ├── classes/
  │   │   ├── com/almoxarifado/...
  │   │   └── application.properties
  │   └── lib/
  │       └── (all dependencies)
  └── org/springframework/boot/loader/
```

## Compiler Configuration

### Javac Settings
```
Source Compatibility: 21
Target Compatibility: 21
Release Target: 21
Debug: Enabled
Source Encoding: UTF-8
Incremental Compilation: Enabled
```

### Compilation Statistics
```
Total Source Files: 50
Compiled Successfully: 50
Compilation Errors: 0
Compilation Warnings: 0
Total Classes Generated: ~50+
```

## JVM Options Reference

### Recommended Runtime JVM Options
```bash
# Heap Memory Configuration
-Xms512m -Xmx1024m

# Garbage Collection
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200

# Performance Monitoring
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-Xloggc:gc.log

# Application Logging
-Dlogging.level.com.almoxarifado=INFO
-Dlogging.level.org.springframework=INFO
```

### Virtual Threads Support (Optional)
```bash
# Enable virtual threads for high concurrency
-XX:+UnlockExperimentalVMOptions
-XX:+UseVirtualThreads
```

## Module System

### Java Modules in Use (via Spring Boot)
```
java.base
java.sql
java.logging
java.management
java.desktop (for GUI components if needed)
java.naming
java.net.http
```

### Application Module Configuration
- Not using module-info.java (classpath-based configuration)
- Full backward compatibility with existing code
- Spring Boot handles all module-related configurations

## Java 21 Language Features Enabled

### Pattern Matching
- Available for instanceof
- Available for switch expressions
- Cascading patterns support

### Record Classes
- Available (if used in application)
- Immutable data carriers
- Automatic toString(), equals(), hashCode()

### Sealed Classes
- Available (if used in application)
- Limited type hierarchies

### Text Blocks
- Multi-line strings support
- Available for SQL queries and JSON

### Virtual Threads (Preview)
- Available with --enable-preview
- High-throughput concurrent applications
- Reduced resource consumption

## Compatibility Notes

### Deprecated Features Removed in Java 21
- AppletViewer (deprecated long ago)
- finalize() mechanism improvements

### Deprecated Features Still Available
- Threads (though Virtual Threads are now available)
- Traditional Concurrency patterns

### Migration Path Considerations
- No major source code changes required
- JVM is binary compatible
- Library updates recommended for optimal performance

## Performance Characteristics

### Memory Usage
- Slightly improved from Java 17
- Better memory layout for large heaps
- Reduced GC overhead with G1GC

### Startup Time
- Comparable to Java 17
- Faster with CDS (Class Data Sharing)
- Optimized class loading

### Throughput
- Improved with better compiler optimizations
- Virtual Threads enable higher concurrency
- Better CPU cache utilization

## Monitoring & Diagnostics

### Available Tools
```
jcmd - JVM command-line tool
jps - Java process status
jstat - Java statistics monitoring
jmap - Heap dump analysis
jstack - Thread dump
jdeps - Java dependency analyzer
jconsole - GUI monitoring
jhsdb - Java Heap Dump Browser
jfr - Java Flight Recorder (profiling)
```

### Example Diagnostics Commands
```bash
# Check JVM version
java -version

# Print system properties
java -XshowSettings:properties

# Generate heap dump
jcmd <pid> GC.heap_dump <file>

# Monitor JVM in real-time
jconsole
```

## Security Settings

### Default Security Properties
- HTTPS/TLS 1.2+ enforced
- Strong cipher suites configured
- Certificate validation enabled
- SHA-256 default for signatures

### Spring Security Configuration
- CSRF protection enabled
- CORS configured in CorsConfig.java
- JWT token validation active
- Password encoding with BCrypt

## Upgrade Verification Steps

### Manual Verification Checklist
```bash
# 1. Verify Java 21 Installation
java -version

# 2. Check Maven Build
cd almoxarifado-backend
mvn clean verify

# 3. Build Spring Boot Application
mvn spring-boot:build-image

# 4. Start Application
java -jar target/*.jar

# 5. Check Application Health
curl http://localhost:8080/actuator/health

# 6. Verify Database Connection
curl http://localhost:8080/api/produtos (or appropriate endpoint)
```

## CI/CD Integration

### Build Pipeline Commands
```bash
# GitHub Actions / GitLab CI
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
mvn -B clean verify
mvn -B spring-boot:build-image
```

### Docker Build
```dockerfile
FROM openjdk:21-jdk-slim as build
WORKDIR /workspace
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && cd target/dependency && jar -xf ../*.jar

FROM openjdk:21-jdk-slim
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring
EXPOSE 8080
COPY --from=build workspace/target/dependency/BOOT-INF/lib /app/lib
COPY --from=build workspace/target/dependency/META-INF /app/META-INF
COPY --from=build workspace/target/dependency/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.almoxarifado.almoxarifado_backend.AlmoxarifadoBackendApplication"]
```

## Maintenance Schedule

### Regular Tasks
- Monthly: Check for Java 21 security updates
- Quarterly: Review Spring Boot patch updates
- Yearly: Assess new Java 21 features for adoption

### End of Life Dates
- Java 21 LTS: Support until September 2028
- Spring Boot 3.5: Support until November 2025
- Plan upgrade to Java 25 or future LTS in 2026-2027

## References

### Official Documentation
- [Java 21 Release Notes](https://jdk.java.net/21/release-notes)
- [Spring Boot 3.5 Docs](https://spring.io/projects/spring-boot)
- [Maven Documentation](https://maven.apache.org/guides/)

### Java Enhancement Proposals (JEPs)
- JEP 428: Structured Concurrency (Preview)
- JEP 430: String Templates (Preview)
- JEP 431: Sequenced Collections
- JEP 439: Generational ZGC

---
**Document Version**: 1.0
**Last Updated**: November 27, 2025
**Java Version**: 21.0.9 LTS
**Status**: Production Ready
