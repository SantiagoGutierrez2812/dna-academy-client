const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshToken(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
        return response.ok;
    } catch {
        return false;
    }
}

export async function fetchWithRefresh(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
    });

    if (response.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshToken();
        }

        const refreshed = await refreshPromise;
        isRefreshing = false;
        refreshPromise = null;

        if (refreshed) {
            return fetch(url, {
                ...options,
                credentials: "include",
            });
        }
    }

    return response;
}

export { API_URL };
