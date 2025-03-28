import { useCallback } from 'react';

export type FetchWithAuthArgs = {
  url: string;
  input?: RequestInit;
  query?: Record<string, string | number>;
};

export const useAuthHttp = () => {
  const fetchWithAuth = useCallback(
    async ({ url, input, query }: FetchWithAuthArgs) => {
      const token = localStorage.getItem('token');

      if (query) {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          params.append(key, String(value));
        });
        url += `?${params.toString()}`;
      }

      const headers = new Headers(input?.headers || {});

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      const response = await fetch(url, {
        ...input,
        headers,
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(error);
        return null;
      }

      return response.json();
    },
    [],
  );

  return fetchWithAuth;
};
