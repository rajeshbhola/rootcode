---
layout: post
title: Database Design Best Practices for Scalable Applications
categories: [Backend, Databases, Architecture]
tags: [database, sql, nosql, design, architecture, scalability]
excerpt: Learn essential database design principles, normalization, indexing strategies, and best practices for building scalable and performant database systems.
---

Good database design is the foundation of any successful application. This guide covers essential principles and best practices for designing databases that scale and perform efficiently.

## Database Design Fundamentals

### Choosing the Right Database

**Relational (SQL) Databases**
- PostgreSQL, MySQL, SQL Server
- Best for: Complex queries, transactions, data integrity
- Use when: You need ACID compliance and structured data

**NoSQL Databases**
- MongoDB, Cassandra, Redis, DynamoDB
- Best for: Flexibility, horizontal scaling, high throughput
- Use when: Schema flexibility and massive scale are priorities

## Normalization Principles

Normalization eliminates data redundancy and ensures data integrity.

### First Normal Form (1NF)

Each column contains atomic values:

```sql
-- Bad: Multiple values in one column
CREATE TABLE users (
    id INT,
    name VARCHAR(100),
    phone_numbers VARCHAR(255)  -- "123-456, 789-012"
);

-- Good: Atomic values
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE user_phones (
    id INT PRIMARY KEY,
    user_id INT,
    phone_number VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Second Normal Form (2NF)

Eliminate partial dependencies:

```sql
-- Bad: Non-key attributes depend on part of composite key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),  -- Depends only on product_id
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Good: Separate into proper tables
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Third Normal Form (3NF)

Eliminate transitive dependencies:

```sql
-- Bad: City depends on zip_code, not on customer_id
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    zip_code VARCHAR(10),
    city VARCHAR(100)  -- Depends on zip_code
);

-- Good: Separate location data
CREATE TABLE zip_codes (
    zip_code VARCHAR(10) PRIMARY KEY,
    city VARCHAR(100),
    state VARCHAR(50)
);

CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    zip_code VARCHAR(10),
    FOREIGN KEY (zip_code) REFERENCES zip_codes(zip_code)
);
```

## Indexing Strategies

Indexes dramatically improve query performance but have costs.

### When to Use Indexes

```sql
-- Index frequently queried columns
CREATE INDEX idx_users_email ON users(email);

-- Composite indexes for multi-column queries
CREATE INDEX idx_orders_user_date
ON orders(user_id, created_at);

-- Covering indexes include all queried columns
CREATE INDEX idx_users_search
ON users(last_name, first_name, email);

-- Partial indexes for specific conditions
CREATE INDEX idx_active_users
ON users(email)
WHERE active = true;
```

### Index Best Practices

1. **Index foreign keys**: Always index columns used in JOINs
2. **Index WHERE clauses**: Columns in WHERE conditions
3. **Index ORDER BY**: Columns used for sorting
4. **Avoid over-indexing**: Each index has write overhead
5. **Monitor performance**: Use EXPLAIN to analyze queries

```sql
-- Analyze query performance
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 123
ORDER BY created_at DESC;
```

## Primary Keys and IDs

### Auto-incrementing IDs

```sql
-- Simple and predictable
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL
);
```

**Pros**: Simple, small size, sequential
**Cons**: Predictable, not globally unique, issues with distributed systems

### UUIDs

```sql
-- Globally unique identifiers
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL
);
```

**Pros**: Globally unique, unpredictable, good for distributed systems
**Cons**: Larger size (16 bytes), random order affects index performance

### Composite Primary Keys

```sql
-- Multiple columns as primary key
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    assigned_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, role_id)
);
```

## Relationships and Foreign Keys

### One-to-Many

```sql
CREATE TABLE authors (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(200),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

### Many-to-Many

Use junction tables:

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE courses (
    id INT PRIMARY KEY,
    title VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

### One-to-One

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50)
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    bio TEXT,
    avatar_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);
```

## Data Types Best Practices

### Choose Appropriate Types

```sql
-- Good practices
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,  -- Not VARCHAR(MAX)
    price DECIMAL(10, 2),         -- Not FLOAT for money
    quantity INT,                 -- Not VARCHAR
    is_active BOOLEAN,            -- Not CHAR(1)
    created_at TIMESTAMP,         -- Not VARCHAR
    metadata JSONB                -- For flexible data
);
```

### Common Mistakes

```sql
-- Bad: Using VARCHAR for numbers
phone VARCHAR(20) -- OK for display
user_age VARCHAR(3) -- Bad, use INT

-- Bad: Using TEXT when VARCHAR is sufficient
status TEXT -- Use VARCHAR(20) if length is known

-- Bad: Using FLOAT for currency
price FLOAT -- Use DECIMAL(10, 2)

-- Bad: Storing dates as strings
birth_date VARCHAR(10) -- Use DATE or TIMESTAMP
```

## Performance Optimization

### Query Optimization

```sql
-- Bad: SELECT *
SELECT * FROM users WHERE email = 'user@example.com';

-- Good: Select only needed columns
SELECT id, name, email FROM users WHERE email = 'user@example.com';

-- Bad: Function in WHERE clause
SELECT * FROM orders WHERE YEAR(created_at) = 2024;

-- Good: Use range
SELECT * FROM orders
WHERE created_at >= '2024-01-01'
  AND created_at < '2025-01-01';

-- Use EXISTS instead of IN for large datasets
-- Bad
SELECT * FROM orders WHERE user_id IN (
    SELECT id FROM users WHERE country = 'USA'
);

-- Good
SELECT * FROM orders o
WHERE EXISTS (
    SELECT 1 FROM users u
    WHERE u.id = o.user_id AND u.country = 'USA'
);
```

### Denormalization for Performance

Sometimes breaking normalization rules improves performance:

```sql
-- Store computed values
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2),  -- Denormalized total
    item_count INT,                -- Denormalized count
    created_at TIMESTAMP
);

-- Update triggers maintain consistency
CREATE TRIGGER update_order_totals
AFTER INSERT OR UPDATE OR DELETE ON order_items
FOR EACH ROW
EXECUTE FUNCTION recalculate_order_totals();
```

## Constraints and Validation

### Essential Constraints

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age >= 18),
    status VARCHAR(20) DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) CHECK (total >= 0),
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Handling Soft Deletes

```sql
CREATE TABLE posts (
    id INT PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    deleted_at TIMESTAMP NULL,  -- NULL means not deleted
    created_at TIMESTAMP DEFAULT NOW()
);

-- Query only active records
CREATE VIEW active_posts AS
SELECT * FROM posts WHERE deleted_at IS NULL;

-- Soft delete
UPDATE posts SET deleted_at = NOW() WHERE id = 123;

-- Restore
UPDATE posts SET deleted_at = NULL WHERE id = 123;
```

## Audit Trails

```sql
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50),
    record_id INT,
    action VARCHAR(20),  -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    user_id INT,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Trigger for automatic auditing
CREATE TRIGGER users_audit
AFTER UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION log_audit_trail();
```

## Database Migrations

### Version Control Your Schema

```sql
-- migrations/001_create_users.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- migrations/002_add_email_to_users.sql
ALTER TABLE users
ADD COLUMN email VARCHAR(100) UNIQUE;

-- migrations/003_add_user_profiles.sql
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Security Best Practices

### SQL Injection Prevention

```javascript
// Bad: String concatenation
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// Good: Parameterized queries
const query = 'SELECT * FROM users WHERE email = $1';
const result = await db.query(query, [userInput]);
```

### Encryption

```sql
-- Encrypt sensitive data
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Store encrypted passwords
INSERT INTO users (username, password)
VALUES ('john', crypt('mypassword', gen_salt('bf')));

-- Verify password
SELECT * FROM users
WHERE username = 'john'
  AND password = crypt('mypassword', password);
```

## Scalability Strategies

### Partitioning

```sql
-- Range partitioning by date
CREATE TABLE orders (
    id SERIAL,
    user_id INT,
    created_at DATE
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2024_q1
PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE orders_2024_q2
PARTITION OF orders
FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
```

### Read Replicas

- Master for writes
- Replicas for read queries
- Reduces load on primary database

### Connection Pooling

```javascript
// Use connection pools
const pool = new Pool({
    host: 'localhost',
    database: 'mydb',
    max: 20,           // Max connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});
```

## Monitoring and Maintenance

### Key Metrics

1. Query execution time
2. Connection pool usage
3. Index hit rate
4. Table bloat
5. Lock contention

### Regular Maintenance

```sql
-- Analyze table statistics
ANALYZE users;

-- Vacuum to reclaim space
VACUUM FULL users;

-- Reindex when needed
REINDEX TABLE users;
```

## Conclusion

Effective database design requires balancing normalization, performance, and scalability. Remember to:

- Start with proper normalization
- Index strategically
- Choose appropriate data types
- Implement constraints
- Plan for scale
- Monitor performance
- Use migrations for schema changes

Good database design pays dividends throughout the life of your application. Invest time upfront to create a solid foundation for your data.
