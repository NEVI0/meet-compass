export type StorageKey = 'THEME';

type StorableBody = Record<StorageKey, unknown> & {
    THEME: 'dark' | 'light';
};

export type StorageBody<T extends StorageKey> = StorableBody[T];

export interface StorageProviderAbstract {
    get<T extends StorageKey>(key: T): StorageBody<T> | null;
    store<T extends StorageKey>(key: T, data: StorageBody<T>): void;

    delete(key: StorageKey): void;
    clear(): void;
}
