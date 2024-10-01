import {
    StorageBody,
    StorageKey,
    StorageProviderAbstract,
} from '@domain/providers';

const STORAGE_KEYS: Record<StorageKey, string> = {
    THEME: '@meet-compass:theme',
};

export default class LocalStorageProvider implements StorageProviderAbstract {
    public clear(): void {
        localStorage.clear();
    }

    public delete(key: StorageKey): void {
        const translatedKey = STORAGE_KEYS[key];
        localStorage.removeItem(translatedKey);
    }

    public get<T extends StorageKey>(key: T): StorageBody<T> | null {
        const translatedKey = STORAGE_KEYS[key];

        try {
            const serialized = localStorage.getItem(translatedKey);
            if (!serialized) return null;

            const parsed = JSON.parse(serialized) as StorageBody<T>;
            return parsed;
        } catch (error) {
            return null;
        }
    }

    public store<T extends StorageKey>(key: T, data: StorageBody<T>): void {
        const translatedKey = STORAGE_KEYS[key];
        const serialized = JSON.stringify(data);

        localStorage.setItem(translatedKey, serialized);
    }
}
