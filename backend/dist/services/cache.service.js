"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
// TTL in seconds (default 60 seconds)
const cache = new node_cache_1.default({ stdTTL: 60, checkperiod: 120 });
exports.cacheService = {
    async getOrSet(key, fetchFunction, ttlSeconds = 60) {
        const cached = cache.get(key);
        if (cached !== undefined) {
            return cached;
        }
        const fresh = await fetchFunction();
        cache.set(key, fresh, ttlSeconds);
        return fresh;
    },
    invalidate(key) {
        cache.del(key);
    },
    invalidatePattern(pattern) {
        const keys = cache.keys();
        const regex = new RegExp(pattern);
        keys.forEach(key => {
            if (regex.test(key)) {
                cache.del(key);
            }
        });
    },
    flush() {
        cache.flushAll();
    }
};
//# sourceMappingURL=cache.service.js.map