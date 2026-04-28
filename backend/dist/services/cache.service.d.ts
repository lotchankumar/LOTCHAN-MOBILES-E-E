export declare const cacheService: {
    getOrSet<T>(key: string, fetchFunction: () => Promise<T>, ttlSeconds?: number): Promise<T>;
    invalidate(key: string): void;
    invalidatePattern(pattern: string): void;
    flush(): void;
};
//# sourceMappingURL=cache.service.d.ts.map