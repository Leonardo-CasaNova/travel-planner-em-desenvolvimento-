const BASE_URL = 'http://localhost:3001';
const TOKEN_KEY = 'travel_planner_token';

export interface Viagem {
  id: string;
  nome: string;
  dataInicio: string;
  dataFim: string;
  userId?: string;
  createdAt?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

async function apiFetch(path: string, init?: RequestInit) {
  const token = getToken();

  const headers = new Headers(init?.headers);
  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    clearToken();
  }

  return response;
}

export async function register(payload: RegisterPayload) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(payload: LoginPayload) {
  const response = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return response;
  }

  const data = (await response.json()) as AuthResponse;
  setToken(data.access_token);
  return response;
}

export async function buscarViagens() {
  return apiFetch('/viagens');
}

export async function criarViagem(dados: Omit<Viagem, 'id'>) {
  return apiFetch('/viagens', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

export async function atualizarViagem(id: string, dados: Partial<Viagem>) {
  return apiFetch(`/viagens/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  });
}

export async function deletarViagem(id: string) {
  return apiFetch(`/viagens/${id}`, {
    method: 'DELETE',
  });
}