export declare const cacheService: {
    getOrSet<T>(key: string, fetchFunction: () => Promise<T>, ttlSeconds?: number): Promise<T>;
    set<T>(key: string, value: T, ttlSeconds?: number): void;
    get<T>(key: string): T | undefined;
    invalidate(key: string): void;
    invalidatePattern(pattern: string): void;
    flush(): void;
};
//# sourceMappingURL=cache.service.d.ts.map