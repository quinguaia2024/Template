export type UserRole = 'Aluno' | 'Tutor' | 'Professor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  dateOfBirth?: string;
  country?: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

export interface RegisterData {
  role: UserRole;
  name: string;
  email: string;
  dateOfBirth: string;
  country: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };