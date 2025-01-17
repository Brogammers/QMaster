# QMaster - Enterprise Queue Management System

![QMaster Logo](/web/public/FooterLogo.svg)

**Modern Queue Management for Modern Businesses**

## 📋 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [System Architecture](#system-architecture)
* [Technology Stack](#technology-stack)
* [Projects](#projects)
  * [Web Portal](#web-portal)
  * [Server](#server)
  * [Mobile App](#mobile-app)
  * [Project Sia](#project-sia)
* [Getting Started](#getting-started)
* [Development](#development)
* [API Documentation](#api-documentation)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [Project Management](#project-management)
* [License](#license)

## 🌟 Overview

QMaster is an enterprise-grade queue management system designed to revolutionize how businesses handle customer flow and service delivery. Our system addresses the universal challenge of queue management across various sectors including:

* Healthcare (Clinics, Hospitals)
* Banking & Financial Services
* Government Services
* Retail
* Telecommunications
* Education
* Automotive Services
* Private Catering
* Restaurant Management

### The Problem

Traditional queue management systems often suffer from:

* Poor customer experience due to long wait times
* Inefficient resource allocation
* Lack of real-time analytics
* Limited integration capabilities
* Inflexible service configurations

### Our Solution

QMaster provides a comprehensive SaaS platform that:

* Streamlines customer flow
* Provides real-time queue analytics
* Offers multi-channel queue management
* Supports diverse business categories
* Enables data-driven decision making

## 🎯 Features

### Core Features

1. **Multi-Service Queue Management**
   * Counter-based services
   * Table management
   * Appointment scheduling
   * Booking systems

2. **Real-time Monitoring**
   * Live queue status
   * Wait time predictions
   * Service performance metrics
   * Resource utilization tracking

3. **Business Administration**
   * Service configuration
   * Staff management
   * Operating hours
   * Customer feedback collection

4. **Customer Experience**
   * Mobile ticket generation
   * SMS notifications
   * Queue position tracking
   * Service ratings

5. **Analytics & Reporting**
   * Service performance metrics
   * Customer flow analysis
   * Peak hour identification
   * Resource optimization insights

## 🏗 System Architecture

![System Architecture](docs/assets/architecture.png)

```text
[Client Layer]
   │
   ├─[Web Portal]
   │
   └─[Mobile App]
      │
      ▼
[API Gateway]
      │
      ├────────────┬─────────────┐
      │            │             │
      ▼            ▼             ▼
[Auth Service] [Queue Service] [Notification Service]
      │            │             │
      │            │             ├─>[SMS Provider]
      │            │             │
      │            │             └─>[Email Service]
      └────────────┴─────────────┐
                   │
                   ▼
             [Database]
```

> **Note**: If you're viewing the source code, the system follows this architecture:
> - Client Layer connects to Web Portal and Mobile App
> - Both connect to API Gateway
> - Gateway routes to Authentication, Queue, and Notification Services
> - All services connect to the Database
> - Notification Service connects to SMS and Email providers

## 🛠 Technology Stack

### Frontend Technologies

* **Web Portal**: Next.js 14, React 18, TypeScript
* **State Management**: Redux Toolkit
* **UI Components**: 
  * Ant Design
  * Material-UI
  * Tailwind CSS
* **Animations**: Framer Motion, GSAP
* **Form Handling**: Formik, Yup

### Backend Technologies

* **Server**: Java Spring Boot
* **Database**: MySQL
* **Authentication**: JWT, Spring Security
* **Email Service**: SMTP Integration
* **API Documentation**: Swagger/OpenAPI

### Mobile Technologies

* **Framework**: React Native
* **Build Tool**: Expo
* **State Management**: Redux Toolkit
* **Navigation**: React Navigation

## 📱 Projects

### Web Portal

The web portal serves as the primary interface for businesses to manage their queue systems.

#### Key Components

```typescript
// Example of Queue Configuration
interface QueueConfig {
  id: string;
  name: string;
  type: 'COUNTER' | 'TABLE' | 'APPOINTMENT' | 'BOOKING';
  maxCapacity: number;
  isActive: boolean;
  averageServiceTime: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  allowsPreBooking: boolean;
}
```

#### Features

* Dynamic service configuration
* Real-time queue monitoring
* Staff management
* Analytics dashboard
* Customer feedback management

### Server

The backend server handles all business logic and data management.

#### API Structure

```java
@RestController
@RequestMapping("/api/v1/queues")
public class QueueController {
    @PostMapping
    public ResponseEntity<Queue> createQueue(@RequestBody QueueDTO queueDTO) {
        // Queue creation logic
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<QueueStatus> getQueueStatus(@PathVariable String id) {
        // Queue status retrieval logic
    }
}
```

#### Database Schema

```sql
CREATE TABLE queues (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    max_capacity INT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Mobile App

The mobile app provides customers with easy access to queue services.

#### Features

* Digital ticket generation
* Queue status tracking
* Push notifications
* Service ratings
* Booking management

### Project Sia

<img src="./mobile-app/assets/images/Sia AI.png" alt="Sia AI" width="64" height="64" style="border-radius: 50%; background: linear-gradient(45deg, #00F5A0, #00D9F5);" />

> **CLASSIFIED - INTERNAL USE ONLY**
> 
> Project Sia represents our proprietary AI engine that powers QMaster's intelligent features. This is a restricted component with classified implementation details.

#### Overview

Project Sia is QMaster's cutting-edge AI system that enables intelligent queue management and predictive analytics. Built on our proprietary NanoLLM Strategy, it provides enterprise-grade AI capabilities with minimal computational overhead.

#### Key Components

* **SiaCore**: Lightweight AI engine
* **Intent Classification System**: For natural language understanding
* **Predictive Analytics Engine**: For queue time predictions
* **Resource Optimization System**: For staff and service allocation

#### Technical Specifications

* Memory Footprint: < 100MB
* Response Time: < 100ms
* Concurrent Users: 1000+ per server
* Deployment: Edge-ready

> **Note**: The implementation details, architecture, and source code of Project Sia are classified. Access is restricted to authorized team members only.

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* Java 17+
* MySQL 8+
* Android Studio / Xcode

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Brogammers/QMaster.git
   cd QMaster
   ```

2. **Web Portal Setup**

   ```bash
   cd web
   yarn install
   cp .env.example .env
   yarn dev
   ```

3. **Server Setup**

   ```bash
   cd server
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

4. **Mobile App Setup**

   ```bash
   cd mobile-app
   yarn install
   npx expo start
   ```

## 👩‍💻 Development

### Code Style

We follow strict coding standards across all projects:

* **TypeScript**: [AirBnB Style Guide](https://github.com/airbnb/javascript)
* **Java**: [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
* **React/React Native**: [React Style Guide](https://reactjs.org/docs/code-splitting.html)

### Testing

Each project includes comprehensive testing:

```bash
# Web Portal Tests
cd web
yarn test

# Server Tests
cd server
./mvnw test

# Mobile App Tests
cd mobile-app
yarn test
```

## 📚 API Documentation

API documentation is available through Swagger UI:

* Development: `http://localhost:8080/swagger-ui.html`
* Production: `https://api.qmaster.com/swagger-ui.html`

## 🌐 Deployment

### Web Portal

```bash
cd web
yarn build
yarn start
```

### Server

```bash
cd server
./mvnw clean package
java -jar target/qmaster-server.jar
```

### Mobile App

```bash
cd mobile-app
eas build
```

## 🏢 Company & Team

QMaster is a proprietary, closed-source SaaS product developed and maintained by QMaster Technologies.

### Leadership & Development Team

* [Fam Awad](https://www.linkedin.com/in/famalouiz/) - Co-founder
* [Hatem Soliman](https://www.linkedin.com/in/h4temsoliman/) - Co-founder
* [Mohammed ElAzab](https://www.linkedin.com/in/mohammed-elazab/) - Co-founder
* [Omar Safwat](https://www.linkedin.com/in/omar-safwat-802122277/) - Co-founder
* [Tony Makaryous](https://www.linkedin.com/in/tony-makaryous-6726b0212/) - Co-founder

### Alumni Team Members

* Hassan
* Youssef Effat

> **Note**: QMaster is proprietary software. All rights reserved. This codebase is not open for external contributions and is protected under intellectual property laws.

## 📊 Project Management

### JIRA

* Project Board: [QMaster JIRA Board](https://qrmasters.atlassian.net/jira/software/projects/QUEUE/boards/1)
* Sprint Planning
* Issue Tracking
* Release Management

### Confluence

* Technical Documentation (SRS): [QMaster Confluence Board](https://qrmasters.atlassian.net/wiki/x/YYAB)
* Meeting Notes
* Design Documents
* Process Guidelines

## 📄 License

QMaster is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.

---

[![Website](https://img.shields.io/badge/Website-QMaster-blue)](https://linkedin.com/company/qmasterapp)
[![Docs](https://img.shields.io/badge/Docs-QMaster-green)](https://docs.qmaster.com)
[![Blog](https://img.shields.io/badge/Blog-QMaster-orange)](https://qmaster.com/blog)

Built with ❤️ by the QMaster Team
