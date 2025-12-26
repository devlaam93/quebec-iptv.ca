/**
 * Global image cache to track already-loaded images across components
 * Prevents redundant network requests and provides instant loading for cached images
 */

interface CachedImage {
  src: string;
  width: number;
  height: number;
  loadedAt: number;
  size?: number;
  type?: string;
}

interface ImageCacheStats {
  totalImages: number;
  totalSize: number;
  hitCount: number;
  missCount: number;
  hitRate: number;
}

type CacheEventType = "add" | "remove" | "clear" | "hit" | "miss";
type CacheEventListener = (event: { type: CacheEventType; src?: string; image?: CachedImage }) => void;

class ImageCache {
  private cache: Map<string, CachedImage> = new Map();
  private hitCount: number = 0;
  private missCount: number = 0;
  private maxSize: number;
  private listeners: Set<CacheEventListener> = new Set();

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  /**
   * Check if an image is in the cache
   */
  has(src: string): boolean {
    const exists = this.cache.has(src);
    if (exists) {
      this.hitCount++;
      this.emit("hit", src);
    } else {
      this.missCount++;
      this.emit("miss", src);
    }
    return exists;
  }

  /**
   * Check if an image is cached without affecting hit/miss stats
   */
  peek(src: string): boolean {
    return this.cache.has(src);
  }

  /**
   * Get cached image info
   */
  get(src: string): CachedImage | undefined {
    return this.cache.get(src);
  }

  /**
   * Add an image to the cache
   */
  set(src: string, info: Omit<CachedImage, "src" | "loadedAt">): void {
    // Evict oldest entries if at capacity
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
        this.emit("remove", oldestKey);
      }
    }

    const cachedImage: CachedImage = {
      src,
      ...info,
      loadedAt: Date.now(),
    };

    this.cache.set(src, cachedImage);
    this.emit("add", src, cachedImage);
  }

  /**
   * Remove an image from the cache
   */
  delete(src: string): boolean {
    const deleted = this.cache.delete(src);
    if (deleted) {
      this.emit("remove", src);
    }
    return deleted;
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
    this.emit("clear");
  }

  /**
   * Get all cached image sources
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get all cached images
   */
  values(): CachedImage[] {
    return Array.from(this.cache.values());
  }

  /**
   * Get cache statistics
   */
  getStats(): ImageCacheStats {
    const totalSize = Array.from(this.cache.values()).reduce(
      (acc, img) => acc + (img.size || 0),
      0
    );
    const totalRequests = this.hitCount + this.missCount;

    return {
      totalImages: this.cache.size,
      totalSize,
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate: totalRequests > 0 ? this.hitCount / totalRequests : 0,
    };
  }

  /**
   * Subscribe to cache events
   */
  subscribe(listener: CacheEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Emit an event to all listeners
   */
  private emit(type: CacheEventType, src?: string, image?: CachedImage): void {
    this.listeners.forEach((listener) => listener({ type, src, image }));
  }

  /**
   * Preload and cache an image
   */
  async preload(
    src: string,
    options: { fetchPriority?: "high" | "low" | "auto" } = {}
  ): Promise<CachedImage> {
    // Return cached if exists
    const cached = this.get(src);
    if (cached) {
      this.hitCount++;
      this.emit("hit", src);
      return cached;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();

      if ("fetchPriority" in img && options.fetchPriority) {
        (img as any).fetchPriority = options.fetchPriority;
      }

      img.onload = () => {
        const cachedImage: CachedImage = {
          src,
          width: img.naturalWidth,
          height: img.naturalHeight,
          loadedAt: Date.now(),
        };
        this.set(src, cachedImage);
        resolve(cachedImage);
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }

  /**
   * Preload multiple images
   */
  async preloadMany(
    sources: string[],
    options: { fetchPriority?: "high" | "low" | "auto"; sequential?: boolean } = {}
  ): Promise<PromiseSettledResult<CachedImage>[]> {
    const { sequential = false, ...preloadOptions } = options;

    if (sequential) {
      const results: PromiseSettledResult<CachedImage>[] = [];
      for (const src of sources) {
        try {
          const image = await this.preload(src, preloadOptions);
          results.push({ status: "fulfilled", value: image });
        } catch (error) {
          results.push({ status: "rejected", reason: error });
        }
      }
      return results;
    }

    return Promise.allSettled(
      sources.map((src) => this.preload(src, preloadOptions))
    );
  }

  /**
   * Get the size of the cache
   */
  get size(): number {
    return this.cache.size;
  }
}

// Global singleton instance
export const imageCache = new ImageCache(100);

// Export class for custom instances
export { ImageCache };
export type { CachedImage, ImageCacheStats, CacheEventType, CacheEventListener };
