# Smart Tourist Safety Monitoring System - Backend

A comprehensive backend system for tourist safety monitoring and incident response using FastAPI, PostgreSQL, Redis, and various AI/ML services.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Real-time Monitoring**: WebSocket connections for live updates
- **Geospatial Queries**: PostGIS integration for location-based services
- **AI/ML Integration**: Safety score calculation and anomaly detection
- **Notification System**: Multi-channel notifications (SMS, Email, Push)
- **Evidence Management**: Secure file storage with blockchain references
- **Analytics**: Comprehensive tourism analytics and reporting

## Tech Stack

- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with PostGIS
- **Cache & Real-time**: Redis
- **Message Queue**: Celery + Redis
- **File Storage**: AWS S3 (configurable)
- **Search**: Elasticsearch
- **IoT**: MQTT Broker (Mosquitto)
- **AI/ML**: PyTorch, Scikit-learn
- **Monitoring**: Prometheus, Grafana

## Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository and navigate to backend directory
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
3. Start all services:
   ```bash
   docker-compose up -d
   ```
4. Run database migrations:
   ```bash
   docker-compose exec backend alembic upgrade head
   ```
5. Seed test data:
   ```bash
   curl -X POST http://localhost:8000/api/v1/seed-data
   ```

### Manual Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up PostgreSQL with PostGIS:
   ```bash
   # Install PostgreSQL and PostGIS
   sudo apt-get install postgresql postgresql-contrib postgis
   
   # Create database
   sudo -u postgres createdb tourist_safety
   sudo -u postgres psql -d tourist_safety -c "CREATE EXTENSION postgis;"
   ```

3. Set up Redis:
   ```bash
   sudo apt-get install redis-server
   sudo systemctl start redis-server
   ```

4. Configure environment variables in `.env`

5. Run database migrations:
   ```bash
   alembic upgrade head
   ```

6. Start the application:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Test Accounts

After seeding data, you can use these test accounts:

- **Tourist**: tourist@test.com / password123
- **Police**: police@test.com / password123
- **Tourism Dept**: tourism@test.com / password123

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user info

### Tourist APIs
- `GET /api/v1/tourist/profile` - Get tourist profile
- `PUT /api/v1/tourist/profile` - Update tourist profile
- `POST /api/v1/tourist/trip` - Create new trip
- `POST /api/v1/tourist/location` - Update location
- `POST /api/v1/tourist/panic` - Trigger panic button
- `POST /api/v1/tourist/chatbot` - AI chatbot queries

### Police APIs
- `GET /api/v1/police/alerts` - Get alerts
- `PUT /api/v1/police/alerts/{id}` - Update alert status
- `GET /api/v1/police/tourists` - Get tourist list
- `POST /api/v1/police/alerts/{id}/call` - Initiate call

### Tourism Department APIs
- `GET /api/v1/tourism/tourists` - Get tourist registry
- `GET /api/v1/tourism/statistics` - Get tourism statistics
- `GET /api/v1/tourism/analytics/influx` - Tourist influx data
- `GET /api/v1/tourism/analytics/destinations` - Top destinations

### WebSocket
- `WS /api/v1/ws/{client_type}` - Real-time connections

## Database Schema

The system uses the following main entities:

- **Users**: Base user accounts with role-based access
- **Tourists**: Tourist profiles with KYC and safety data
- **Police**: Police officer profiles
- **Tourism Dept**: Tourism department employee profiles
- **Trips**: Tourist trip information and itineraries
- **Alerts**: Emergency alerts and incidents
- **Locations**: GPS tracking and geospatial data
- **Evidence**: File storage for incident evidence

## Real-time Features

### WebSocket Connections
- Tourist alerts and notifications
- Police dashboard live updates
- Tourism department analytics

### Redis Pub/Sub Channels
- `tourist_alerts` - Tourist-specific notifications
- `police_alerts` - Police dashboard alerts
- `tourism_alerts` - Tourism department notifications

## AI/ML Features

### Safety Score Calculation
- Location-based risk assessment
- Time-of-day factors
- Historical incident data
- Crowd density analysis

### Anomaly Detection
- Unusual movement patterns
- Deviation from planned routes
- Inactivity detection
- Distress pattern recognition

### Chatbot Integration
- Tourist query handling
- Safety guidance
- Emergency procedures
- Local information

## Security Features

- JWT token authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- API rate limiting
- Input validation and sanitization
- CORS protection
- TLS encryption support

## Monitoring & Logging

- Health check endpoints
- Structured logging
- Error tracking with Sentry
- Performance monitoring
- Database query optimization

## Deployment

### Production Deployment
1. Use Docker containers
2. Set up Kubernetes cluster
3. Configure load balancer (Nginx/Traefik)
4. Set up monitoring (Prometheus/Grafana)
5. Configure CI/CD pipeline

### Environment Variables
See `.env.example` for all required environment variables.

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## License

This project is licensed under the MIT License.