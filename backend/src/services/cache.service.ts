import NodeCache from 'node-cache';

// TTL in seconds (default 60 seconds)
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export const cacheService = {
  async getOrSet<T>(
    key: string,
    fetchFunction: () => Promise<T>,
    ttlSeconds: number = 60
  ): Promise<T> {
    const cached = cache.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }
    
    const fresh = await fetchFunction();
    cache.set(key, fresh, ttlSeconds);
    return fresh;
  },

  invalidate(key: string): void {
    cache.del(key);
  },

  invalidatePattern(pattern: string): void {
    const keys = cache.keys();
    const regex = new RegExp(pattern);
    keys.forEach(key => {
      if (regex.test(key)) {
        cache.del(key);
      }
    });
  },

  flush(): void {
    cache.flushAll();
  }
};
