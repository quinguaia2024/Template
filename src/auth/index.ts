/**
 * Auth Module — self-contained authentication architecture.
 * 
 * Structure:
 *   src/auth/
 *   ├── index.ts            ← barrel exports (this file)
 *   ├── constants.ts        ← AUTH_BASE_URL, AUTH_ROUTES
 *   ├── types.ts            ← UserRole, User, RegisterData, AuthState, etc.
 *   ├── context/
 *   │   └── AuthContext.tsx  ← AuthProvider + useAuth hook
 *   ├── components/
 *   │   └── PasswordStrength.tsx
 *   └── pages/
 *       ├── AuthGate.tsx
 *       ├── Login.tsx
 *       └── Register.tsx
 */

// Context
export { AuthProvider, useAuth } from './context/AuthContext';

// Pages
export { default as AuthGatePage } from './pages/AuthGate';
export { default as LoginPage } from './pages/Login';
export { default as RegisterPage } from './pages/Register';

// Types
export type { User, UserRole, RegisterData, AuthContextType, AuthState, AuthAction } from './types';

// Constants
export { AUTH_BASE_URL, DASH_BASE_URL, AUTH_ROUTES } from './constants';
