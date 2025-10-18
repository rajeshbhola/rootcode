---
layout: post
title: Building RESTful APIs with Node.js and Express
categories: [Backend, Node.js, APIs]
tags: [nodejs, express, rest-api, backend, javascript, web-development]
excerpt: Master the art of building robust and scalable RESTful APIs using Node.js and Express. Learn best practices, middleware, error handling, and security.
---

Node.js with Express has become the go-to choice for building RESTful APIs. This guide will walk you through creating production-ready APIs with proper architecture and best practices.

## Why Node.js and Express?

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications:

- **Fast Development**: Minimal setup and configuration
- **Middleware Ecosystem**: Rich ecosystem of middleware packages
- **Scalability**: Event-driven, non-blocking I/O model
- **JSON-First**: Perfect for building JSON APIs

## Setting Up Your Express Server

First, initialize your Node.js project and install Express:

```bash
npm init -y
npm install express
```

Create a basic Express server:

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## RESTful API Design Principles

Follow these principles for clean API design:

### 1. Use HTTP Methods Correctly

```javascript
// GET - Retrieve data
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);

// POST - Create new resource
app.post('/api/users', createUser);

// PUT - Update entire resource
app.put('/api/users/:id', updateUser);

// PATCH - Partial update
app.patch('/api/users/:id', patchUser);

// DELETE - Remove resource
app.delete('/api/users/:id', deleteUser);
```

### 2. Use Proper Status Codes

```javascript
// Success responses
res.status(200).json(data);      // OK
res.status(201).json(data);      // Created
res.status(204).send();          // No Content

// Client errors
res.status(400).json({ error }); // Bad Request
res.status(401).json({ error }); // Unauthorized
res.status(404).json({ error }); // Not Found

// Server errors
res.status(500).json({ error }); // Internal Server Error
```

## Organizing Routes with Express Router

Create modular route handlers:

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

Then use it in your main app:

```javascript
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
```

## Middleware for Common Tasks

### Error Handling Middleware

```javascript
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});
```

### Request Logging

```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

### CORS Configuration

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://yourdomain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

## Input Validation

Use validation libraries like Joi or express-validator:

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/users',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Process valid data
  }
);
```

## Security Best Practices

### 1. Use Helmet for Security Headers

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 2. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. Authentication with JWT

```javascript
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});
```

## Database Integration

Example with MongoDB and Mongoose:

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

## Testing Your API

Use Jest and Supertest for testing:

```javascript
const request = require('supertest');
const app = require('./app');

describe('User API', () => {
  test('GET /api/users should return all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/users should create a user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newUser.name);
  });
});
```

## Conclusion

Building RESTful APIs with Node.js and Express is straightforward once you understand the core principles. Focus on proper routing, error handling, validation, and security to create production-ready APIs that scale.

Remember to:
- Follow RESTful conventions
- Implement proper error handling
- Validate all inputs
- Secure your endpoints
- Write comprehensive tests

With these practices in place, your Express APIs will be robust, maintainable, and ready for production deployment.
