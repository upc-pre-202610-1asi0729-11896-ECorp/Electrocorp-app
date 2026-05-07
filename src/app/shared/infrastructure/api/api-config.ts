const rawApiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || 'https://electrocorp-platform.onrender.com';

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '');