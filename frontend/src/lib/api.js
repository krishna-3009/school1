// In development, use Vite's /api proxy so browser requests stay same-origin.
const apiBaseUrl = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');

export function apiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
}

export async function apiFetch(path, options) {
  try {
    return await fetch(apiUrl(path), options);
  } catch {
    const destination = apiBaseUrl || 'the same origin (or the Vite /api proxy)';
    throw new Error(
      `Cannot connect to the school API at ${destination}. Check that the backend is running and the API URL is configured.`
    );
  }
}

export async function readApiJson(response) {
  return response.json().catch(() => ({}));
}
