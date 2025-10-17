---
layout: post
title: Building Modern Web Applications with React and TypeScript
categories: [Web Development, React, TypeScript]
excerpt: Learn how to build scalable, type-safe web applications using React and TypeScript. This comprehensive guide covers best practices, project setup, and advanced patterns.
---

React and TypeScript have become the go-to combination for building robust, maintainable web applications. In this post, we'll explore why this pairing is so powerful and how to leverage it effectively.

## Why React + TypeScript?

TypeScript adds static typing to JavaScript, catching errors at compile-time rather than runtime. When combined with React, you get:

- **Type Safety**: Catch bugs before they reach production
- **Better IntelliSense**: Enhanced IDE autocomplete and documentation
- **Refactoring Confidence**: Rename components and props with certainty
- **Self-Documenting Code**: Types serve as inline documentation

## Setting Up Your Project

Create a new React TypeScript project using Vite (faster than Create React App):

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

Your project structure will look like this:

```
my-app/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
└── tsconfig.json
```

## Defining Component Props

Always type your component props for better maintainability:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

## Using State with TypeScript

TypeScript infers types automatically, but you can be explicit when needed:

```typescript
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${id}`);
      const data: User = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
```

## Custom Hooks with TypeScript

Create reusable logic with properly typed custom hooks:

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## Best Practices

1. **Use Interfaces Over Types** for object shapes
2. **Enable Strict Mode** in tsconfig.json
3. **Avoid `any`** - use `unknown` if type is truly unknown
4. **Use Discriminated Unions** for complex state management
5. **Leverage Utility Types** - `Partial`, `Pick`, `Omit`, etc.

## Conclusion

React with TypeScript significantly improves the developer experience and code quality. The initial learning curve pays off with fewer runtime errors and better maintainability.

Start small, gradually add types to your existing projects, and watch your confidence in refactoring grow!
