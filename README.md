# Cyber Threat Intelligence Dashboard

> Full-stack cybersecurity platform for IOC enrichment, threat visualization, and incident management. Integrates external threat intelligence sources with interactive analytics dashboards, secure incident reporting workflows, and role-based access control.

## Badges

![Python](https://img.shields.io/badge/Python-3.12-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-black)
![React](https://img.shields.io/badge/React-18-61dafb)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Cybersecurity](https://img.shields.io/badge/Cyber-Threat_Intelligence-red)

## Links

[Features](#features) ·
[Architecture](#architecture) ·
[API Endpoints](#api-endpoints)

## Features

* Real-time IOC enrichment and threat intelligence visualization
* Interactive global threat map displaying IOC lookup activity by country
* Secure incident reporting workflow with role-based authorization
* JWT-based authentication and protected API endpoints
* Incident management dashboard with severity and status tracking
* Threat analytics dashboard with live IOC statistics
* Detailed incident investigation view with modal-based analysis
* MongoDB-backed persistence for incidents and intelligence records
* Analyst-only access controls for security operations workflows
* Responsive React dashboard with modern cybersecurity-focused UI

## Project Metrics

| Metric                | Value                      |
| --------------------- | -------------------------- |
| Architecture          | Full-Stack Web Application |
| Authentication        | JWT + Role-Based Access    |
| Database              | MongoDB                    |
| IOC Visualization     | Global Threat Map          |
| Incident Management   | Analyst Workflow           |
| External Integrations | AbuseIPDB, VirusTotal      |

## Tech Stack

| Category             | Technologies                     |
| -------------------- | -------------------------------- |
| Backend              | Python, Flask, Flask Blueprints  |
| Database             | MongoDB, PyMongo                 |
| Authentication       | JWT, Flask-JWT-Extended          |
| Frontend             | React.js, Axios                  |
| Data Visualization   | Recharts, D3 Scale               |
| Geospatial Analytics | React Simple Maps                |
| Threat Intelligence  | AbuseIPDB API, VirusTotal API    |
| Security             | Role-Based Access Control (RBAC) |

## Architecture

The platform follows a layered architecture that separates intelligence collection, incident management, visualization, and authentication services.

### Authentication Layer

* JWT-based user authentication
* Secure login and registration workflows
* Analyst role verification
* Protected API routes

### Intelligence Layer

* IOC lookup and enrichment
* Threat intelligence aggregation
* Country-level IOC tracking
* External threat feed integration

### Incident Management Layer

* Incident creation and reporting
* Severity classification
* Status tracking and updates
* Incident analytics generation

### Visualization Layer

* Interactive threat map
* IOC activity dashboards
* Incident statistics widgets
* Real-time security monitoring

## Core Modules

### IOC Threat Map

Interactive geospatial visualization showing country-wise IOC lookup frequency and threat intelligence activity.

### Incident Reporting

Secure analyst-only reporting system supporting:

* Incident creation
* Severity assignment
* Status management
* Investigation tracking

### Threat Analytics

Dashboard analytics including:

* Total incident count
* Severity distribution
* Status distribution
* Recent incident activity

### Authentication & Authorization

* User registration
* Secure login
* JWT token management
* Role-based access control

## Screenshots

### Authentication

* Login Page
* Registration Page

### Dashboard

* Threat Intelligence Dashboard
* IOC Lookup Interface
* Incident Reporting Portal

### Analytics

* Global Threat Map
* Incident Analytics
* MITRE ATT&CK Visualization

## API Endpoints

### Authentication

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/api/auth/register` | Register new user               |
| POST   | `/api/auth/login`    | Authenticate user and issue JWT |

### Incident Management

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| POST   | `/api/incidents/`      | Create incident        |
| GET    | `/api/incidents/`      | Retrieve all incidents |
| GET    | `/api/incidents/stats` | Incident statistics    |

### Threat Intelligence

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| GET    | `/api/map/ioc/country-counts` | Country-wise IOC activity |

## Security Features

### Authentication

* JWT-based session management
* Secure token validation
* Protected routes
* Role-based authorization

### Access Control

* Analyst-only incident submission
* Restricted administrative functionality
* Frontend route protection
* Backend permission validation

### Data Security

* Secure API communication
* Protected incident records
* Authenticated intelligence access
* Controlled dashboard operations

## Project Structure

```text
cyber-threat-intelligence-dashboard/
│
├── backend/
│   ├── blueprints/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── app.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│
├── screenshots/
│
├── docs/
│
└── README.md
```

## Quick Start

### Backend Setup

```bash
pip install flask flask-cors flask-jwt-extended pymongo
python app.py
```

Ensure MongoDB is running locally on:

```text
mongodb://localhost:27017
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Access Application

```text
http://localhost:3000
```

## Future Enhancements

* Real-time IOC streaming feeds
* Automated threat intelligence correlation
* IOC reputation scoring engine
* Advanced incident search and filtering
* MITRE ATT&CK mapping automation
* Exportable incident reports
* Threat hunting workflows
* SIEM integration support

## Key Learnings

* Full-stack security application development
* JWT authentication and authorization
* Threat intelligence data visualization
* Geospatial analytics implementation
* Role-based access control design
* REST API development with Flask
* MongoDB document modeling

## Author

**Harshit Parpe**

Information Technology Undergraduate, Delhi Technological University

Cybersecurity • Threat Intelligence • Software Engineering
