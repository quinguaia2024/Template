/**
 * URL base da aplicação de autenticação.
 * Todos os redirects de auth apontam para este domínio.
 */
export const AUTH_BASE_URL = 'https://mentor-ia-v1.vercel.app';

export const AUTH_ROUTES = {
  gate: `${AUTH_BASE_URL}/auth`,
  login: `${AUTH_BASE_URL}/login`,
  register: `${AUTH_BASE_URL}/register`,
  alunoLogin: `${AUTH_BASE_URL}/auth/aluno/login`,
  tutorLogin: `${AUTH_BASE_URL}/auth/tutor/login`,
} as const;
