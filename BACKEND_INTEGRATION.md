# SafeMitra Backend Integration Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [API Endpoints](#api-endpoints)
4. [Data Models](#data-models)
5. [Authentication Flow](#authentication-flow)
6. [Real-time Features](#real-time-features)
7. [Blockchain Integration](#blockchain-integration)
8. [Security Considerations](#security-considerations)
9. [Testing Guidelines](#testing-guidelines)
10. [Deployment Strategy](#deployment-strategy)

## Project Overview

SafeMitra is a mobile emergency response application with the following key components:

### Frontend Components
- User Mobile App (React Native)
- Admin Dashboard (React Native)
- Emergency Response Interface

### Backend Requirements
- RESTful API Server
- Real-time Communication Server
- Blockchain Node
- Database Management System
- File Storage System

## System Architecture

### High-Level Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Mobile Client  │     │  Admin Panel    │     │  Guardian App   │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Microservices                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Auth       │  │  Location   │  │  Emergency          │  │
│  │  Service    │  │  Service    │  │  Response           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  MongoDB    │  │  Redis      │  │  Blockchain         │  │
│  │  Database   │  │  Cache      │  │  Network            │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-otp
POST /api/auth/refresh-token
POST /api/auth/logout
```

### User Management
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/guardians
POST   /api/users/guardians
DELETE /api/users/guardians/:id
```

### Emergency Services
```
POST   /api/emergency/sos
GET    /api/emergency/status/:id
POST   /api/emergency/cancel/:id
GET    /api/emergency/history
```

### Location Services
```
POST   /api/location/update
GET    /api/location/history
POST   /api/location/geofence
```

### Admin Endpoints
```
GET    /api/admin/users
GET    /api/admin/emergencies
GET    /api/admin/statistics
PUT    /api/admin/settings
```

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  phoneNumber: String,
  name: String,
  email: String,
  password: String,
  emergencyContacts: [{
    name: String,
    phoneNumber: String,
    relationship: String,
    isVerified: Boolean
  }],
  settings: {
    sosEnabled: Boolean,
    locationSharing: Boolean,
    notificationPreferences: Object
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Emergency Event Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // 'SOS', 'ROUTE_DEVIATION', 'MANUAL'
  status: String, // 'ACTIVE', 'RESOLVED', 'CANCELLED'
  location: {
    coordinates: [Number],
    address: String,
    timestamp: Date
  },
  guardiansNotified: [ObjectId],
  responseTime: Number,
  blockchainTxId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Location History Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  coordinates: [Number],
  address: String,
  speed: Number,
  accuracy: Number,
  timestamp: Date,
  isShared: Boolean
}
```

## Authentication Flow

1. **User Registration**
   - Phone number verification via OTP
   - Basic profile creation
   - Emergency contact setup

2. **Login Process**
   - JWT token generation
   - Refresh token mechanism
   - Session management

3. **Guardian Verification**
   - OTP-based verification
   - Relationship confirmation
   - Permission management

## Real-time Features

### WebSocket Events
```javascript
// Client Events
SOS_TRIGGERED
LOCATION_UPDATE
ROUTE_DEVIATION
EMERGENCY_CANCELLED

// Server Events
GUARDIAN_NOTIFICATION
EMERGENCY_RESPONSE
LOCATION_SHARED
STATUS_UPDATE
```

### Push Notifications
- Firebase Cloud Messaging (FCM)
- Apple Push Notification Service (APNS)
- Custom notification handling

## Blockchain Integration

### Smart Contract Structure
```solidity
contract EmergencyEvent {
    struct Event {
        uint256 eventId;
        address userAddress;
        string eventType;
        uint256 timestamp;
        string location;
        bool isResolved;
    }
    
    mapping(uint256 => Event) public events;
    uint256 public eventCount;
    
    function createEvent(
        string memory eventType,
        string memory location
    ) public returns (uint256) {
        // Implementation
    }
    
    function resolveEvent(uint256 eventId) public {
        // Implementation
    }
}
```

### Integration Points
1. Event logging
2. Status updates
3. Guardian verification
4. Audit trail

## Security Considerations

### Data Protection
- End-to-end encryption for sensitive data
- Secure storage of location history
- GDPR compliance measures

### API Security
- Rate limiting
- Input validation
- CORS configuration
- API key management

### Authentication Security
- JWT token rotation
- Session management
- Device fingerprinting
- IP-based restrictions

## Testing Guidelines

### Unit Tests
- API endpoints
- Business logic
- Data models
- Utility functions

### Integration Tests
- Authentication flow
- Emergency response system
- Location tracking
- Notification system

### Load Testing
- Concurrent users
- API response times
- Database performance
- Real-time communication

## Deployment Strategy

### Development Environment
- Local development setup
- Staging environment
- Feature branches
- CI/CD pipeline

### Production Environment
- Load balancing
- Database replication
- Backup strategy
- Monitoring and logging

### Scaling Considerations
- Horizontal scaling
- Database sharding
- Caching strategy
- CDN integration

## Additional Resources

### Documentation
- API Documentation
- Database Schema
- Deployment Guide
- Security Protocols

### Tools and Services
- Monitoring Tools
- Logging Services
- Analytics Platform
- Support System

### Contact Information
- Development Team
- Security Team
- Operations Team
- Support Team 