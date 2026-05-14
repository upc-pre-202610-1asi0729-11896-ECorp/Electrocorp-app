export class LocalStorageService {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    getJson<T>(key: string): T | null {
        const rawValue = localStorage.getItem(key);

        if (!rawValue) {
            return null;
        }

        return JSON.parse(rawValue) as T;
    }

    setJson<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}