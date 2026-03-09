import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthState, AuthAction, User, RegisterData } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Verificar se existe sessão salva
    const savedUser = localStorage.getItem('mentor_user');
    const sessionUser = sessionStorage.getItem('mentor_user');
    
    if (savedUser || sessionUser) {
      try {
        const userData = JSON.parse(savedUser || sessionUser || '');
        dispatch({ type: 'SET_USER', payload: userData });
      } catch (error) {
        console.error('Erro ao recuperar sessão:', error);
        localStorage.removeItem('mentor_user');
        sessionStorage.removeItem('mentor_user');
      }
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (email: string, password: string, rememberMe = false): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Verificar credenciais simuladas
      const users = JSON.parse(localStorage.getItem('mentor_registered_users') || '[]');
      const user = users.find((u: User) => u.email === email);
      
      if (!user) {
        throw new Error('Email não encontrado');
      }
      
      // Simular verificação de senha
      const savedPasswords = JSON.parse(localStorage.getItem('mentor_user_passwords') || '{}');
      if (savedPasswords[email] !== password) {
        throw new Error('Senha incorreta');
      }
      
      dispatch({ type: 'SET_USER', payload: user });
      
      // Salvar sessão
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('mentor_user', JSON.stringify(user));
      
      toast({
        title: "Login realizado!",
        description: `Bem-vindo de volta, ${user.name}!`,
      });
      
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Credenciais inválidas",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Verificar se email já existe
      const existingUsers = JSON.parse(localStorage.getItem('mentor_registered_users') || '[]');
      if (existingUsers.find((u: User) => u.email === userData.email)) {
        throw new Error('Este email já está cadastrado');
      }
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        dateOfBirth: userData.dateOfBirth,
        country: userData.country,
        createdAt: new Date(),
      };
      
      // Salvar usuário
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('mentor_registered_users', JSON.stringify(updatedUsers));
      
      // Salvar senha separadamente (simulado)
      const passwords = JSON.parse(localStorage.getItem('mentor_user_passwords') || '{}');
      passwords[userData.email] = userData.password;
      localStorage.setItem('mentor_user_passwords', JSON.stringify(passwords));
      
      dispatch({ type: 'SET_USER', payload: newUser });
      sessionStorage.setItem('mentor_user', JSON.stringify(newUser));
      
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo ao Mentor IA, ${newUser.name}!`,
      });
      
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Erro ao criar conta",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    // Simular envio de email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('mentor_registered_users') || '[]');
    const userExists = users.find((u: User) => u.email === email);
    
    if (!userExists) {
      throw new Error('Email não encontrado');
    }
    
    toast({
      title: "Email enviado!",
      description: "Verifique sua caixa de entrada para redefinir sua senha.",
    });
  };

  const logout = (): void => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('mentor_user');
    sessionStorage.removeItem('mentor_user');
    
    toast({
      title: "Logout realizado",
      description: "Até breve!",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};