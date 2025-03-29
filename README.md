# User Profile Management API

A RESTful API for user registration, authentication, and profile management using Node.js, Express, and MongoDB.

## Features
- User registration and login with JWT authentication
- Get/Update user profile (protected routes)
- Password hashing with bcrypt.js
- MongoDB data storage

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Postman (for testing)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-profile-management.git
   cd user-profile-management
   
2. Install dependencies:
   ```bash
   npm install express mongoose bcryptjs jsonwebtoken dotenv
3. Create a .env file in the root directory
   ```bash
   # .env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
4. Start the server:
  ```bash
  npm start
```
### API Endpoints
| Method | Endpoint | Description |
| ---- | ---- | --- |  
| POST | /api/users/register | Register a new user and get JWT token |
| POST	| /api/users/login | Login and get JWT token |
| GET	| /api/users/profile | Get user profile (protected) |
| PUT	| /api/users/profile	| Update profile (protected) |

### Postman Documentation
https://documenter.getpostman.com/view/32919117/2sB2cPjkTq
