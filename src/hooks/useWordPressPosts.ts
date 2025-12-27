import { useState, useEffect, useRef } from "react";

const API_BASE = "https://posts.quebec-iptv.ca/wp-json/wp/v2";

// Cache configuration
const CACHE_PREFIX = "wp_cache_";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const STALE_TTL = 30 * 60 * 1000; // 30 minutes for stale-while-revalidate

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  headers?: { totalPages: number; totalPosts: number };
}

// In-memory cache for faster access during session
const memoryCache = new Map<string, CacheEntry<unknown>>();

function getCacheKey(endpoint: string, params?: Record<string, string>): string {
  const paramString = params ? JSON.stringify(params) : "";
  return `${CACHE_PREFIX}${endpoint}_${paramString}`;
}

function getFromCache<T>(key: string): CacheEntry<T> | null {
  // Check memory cache first
  const memEntry = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (memEntry) {
    return memEntry;
  }

  // Fall back to localStorage
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const entry = JSON.parse(stored) as CacheEntry<T>;
      // Populate memory cache
      memoryCache.set(key, entry);
      return entry;
    }
  } catch (e) {
    console.warn("Cache read error:", e);
  }
  return null;
}

function setCache<T>(key: string, data: T, headers?: { totalPages: number; totalPosts: number }): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    headers,
  };

  // Update memory cache
  memoryCache.set(key, entry);

  // Persist to localStorage
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (e) {
    // Handle quota exceeded - clear old cache entries
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      clearOldCache();
      try {
        localStorage.setItem(key, JSON.stringify(entry));
      } catch {
        console.warn("Cache write failed after cleanup");
      }
    }
  }
}

function isCacheFresh(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL;
}

function isCacheStale(timestamp: number): boolean {
  return Date.now() - timestamp > STALE_TTL;
}

function clearOldCache(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) {
      try {
        const entry = JSON.parse(localStorage.getItem(key) || "{}");
        if (isCacheStale(entry.timestamp)) {
          keysToRemove.push(key);
        }
      } catch {
        keysToRemove.push(key!);
      }
    }
  }
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    memoryCache.delete(key);
  });
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface WordPressPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  category: string;
  categorySlug: string;
  categoryId: number;
  tags: WordPressTag[];
  metaTitle?: string;
  metaDescription?: string;
}

interface WPPostRaw {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  tags: number[];
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_image?: Array<{ url: string }>;
    twitter_misc?: { [key: string]: string };
  };
  _embedded?: {
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>;
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
  };
}

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function estimateReadTime(content: string): string {
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function transformPost(post: WPPostRaw): WordPressPost {
  const embedded = post._embedded;
  
  // Extract categories from embedded terms
  const categories = embedded?.["wp:term"]?.flat().filter(term => term.taxonomy === "category") || [];
  const category = categories[0] || { id: 0, name: "Non classé", slug: "non-classe" };
  
  // Extract tags from embedded terms
  const tags = embedded?.["wp:term"]?.flat().filter(term => term.taxonomy === "post_tag") || [];
  
  // Extract featured image
  const featuredMedia = embedded?.["wp:featuredmedia"]?.[0];
  const image = featuredMedia?.source_url || "";
  const imageAlt = featuredMedia?.alt_text || stripHtml(post.title.rendered);
  
  // Extract Yoast SEO data
  const yoast = post.yoast_head_json;
  
  // Try to get read time from Yoast twitter_misc or calculate it
  let readTime = estimateReadTime(post.content.rendered);
  if (yoast?.twitter_misc) {
    const readTimeKey = Object.keys(yoast.twitter_misc).find(key => 
      key.toLowerCase().includes("reading") || key.toLowerCase().includes("lecture")
    );
    if (readTimeKey && yoast.twitter_misc[readTimeKey]) {
      readTime = yoast.twitter_misc[readTimeKey];
    }
  }

  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    slug: post.slug,
    date: formatDate(post.date),
    readTime,
    image,
    imageAlt,
    category: category.name,
    categorySlug: category.slug,
    categoryId: category.id,
    tags: tags.map(t => ({ id: t.id, name: t.name, slug: t.slug })),
    metaTitle: yoast?.title,
    metaDescription: yoast?.description,
  };
}

export function useWordPressPosts(options?: { 
  categoryId?: number;
  categoryName?: string;
  categorySlug?: string;
  perPage?: number; 
  page?: number;
  append?: boolean;
}) {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [resolvedCategoryId, setResolvedCategoryId] = useState<number | null>(null);
  const [resolvedCategoryName, setResolvedCategoryName] = useState<string>('');
  const [resolvedCategoryDescription, setResolvedCategoryDescription] = useState<string>('');
  const [resolvedCategoryCount, setResolvedCategoryCount] = useState<number>(0);
  const [resolvingCategory, setResolvingCategory] = useState(!!options?.categoryName || !!options?.categorySlug);
  const [categoryNotFound, setCategoryNotFound] = useState(false);
  const isFetchingRef = useRef(false);
  const currentPageRef = useRef(1);
  const initializedRef = useRef(false);

  // Resolve category name/slug to ID if provided
  useEffect(() => {
    // Helper to find category by name or slug
    const findCategory = (categories: WordPressCategory[], searchTerm: string, bySlug = false): WordPressCategory | undefined => {
      const term = searchTerm.toLowerCase();
      if (bySlug) {
        // For slug search, try exact slug match first
        return categories.find(c => c.slug.toLowerCase() === term);
      }
      // Try exact name match first
      let found = categories.find(c => c.name.toLowerCase() === term);
      if (!found) {
        // Try slug match as fallback
        found = categories.find(c => c.slug.toLowerCase() === term);
      }
      if (!found) {
        // Try partial name match (e.g., "Guide" matches "Guides")
        found = categories.find(c => c.name.toLowerCase().startsWith(term) || term.startsWith(c.name.toLowerCase()));
      }
      return found;
    };

    const searchTerm = options?.categorySlug || options?.categoryName;
    const isSlugSearch = !!options?.categorySlug;

    // Set categoryId directly if provided
    if (options?.categoryId) {
      setResolvedCategoryId(options.categoryId);
      setResolvingCategory(false);
      return;
    }
    
    if (searchTerm) {
      setResolvingCategory(true);
      setCategoryNotFound(false);
      const cacheKey = getCacheKey("categories", {});
      const cached = getFromCache<WordPressCategory[]>(cacheKey);
      
      if (cached) {
        const found = findCategory(cached.data, searchTerm, isSlugSearch);
        if (found) {
          setResolvedCategoryId(found.id);
          setResolvedCategoryName(found.name);
          setResolvedCategoryDescription(found.description || '');
          setResolvedCategoryCount(found.count || 0);
          setCategoryNotFound(false);
          setResolvingCategory(false);
          return;
        } else {
          // Category not found in cache, still try fetching fresh data
        }
      }

      // Fetch categories to resolve the name/slug
      async function fetchAndResolve() {
        try {
          const response = await fetch(`${API_BASE}/categories?per_page=100`);
          if (response.ok) {
            const data = await response.json();
            const transformedCategories: WordPressCategory[] = data.map((cat: { id: number; name: string; slug: string; description?: string; count?: number }) => ({
              id: cat.id,
              name: cat.name,
              slug: cat.slug,
              description: cat.description || '',
              count: cat.count || 0,
            }));
            setCache(cacheKey, transformedCategories);
            const found = findCategory(transformedCategories, searchTerm!, isSlugSearch);
            if (found) {
              setResolvedCategoryId(found.id);
              setResolvedCategoryName(found.name);
              setResolvedCategoryDescription(found.description || '');
              setResolvedCategoryCount(found.count || 0);
              setCategoryNotFound(false);
            } else {
              // Category truly not found
              setCategoryNotFound(true);
            }
          }
        } catch (err) {
          console.error("Error resolving category:", err);
        } finally {
          setResolvingCategory(false);
        }
      }
      fetchAndResolve();
    } else {
      // No category filter, reset to null
      setResolvedCategoryId(null);
      setResolvedCategoryName('');
      setResolvedCategoryDescription('');
      setResolvedCategoryCount(0);
      setResolvingCategory(false);
    }
  }, [options?.categoryName, options?.categorySlug, options?.categoryId]);

  useEffect(() => {
    // Wait for category resolution if categoryName is provided
    if (options?.categoryName && !resolvedCategoryId) {
      return;
    }

    const page = options?.page || 1;
    const isAppending = options?.append && page > 1;
    const categoryToUse = resolvedCategoryId || options?.categoryId;
    
    const cacheParams: Record<string, string> = {
      per_page: String(options?.perPage || 20),
      page: String(page),
    };
    if (categoryToUse) {
      cacheParams.categories = String(categoryToUse);
    }
    
    const cacheKey = getCacheKey("posts", cacheParams);
    const cached = getFromCache<WordPressPost[]>(cacheKey);

    // Return cached data immediately if fresh
    if (cached && isCacheFresh(cached.timestamp)) {
      if (isAppending) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newPosts = cached.data.filter(p => !existingIds.has(p.id));
          return [...prev, ...newPosts];
        });
      } else {
        setPosts(cached.data);
      }
      setTotalPages(cached.headers?.totalPages || 1);
      setTotalPosts(cached.headers?.totalPosts || 0);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    // Use stale data while revalidating
    if (cached && !isCacheStale(cached.timestamp)) {
      if (isAppending) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newPosts = cached.data.filter(p => !existingIds.has(p.id));
          return [...prev, ...newPosts];
        });
      } else {
        setPosts(cached.data);
      }
      setTotalPages(cached.headers?.totalPages || 1);
      setTotalPosts(cached.headers?.totalPosts || 0);
      setLoading(false);
      setLoadingMore(false);
      // Continue to fetch fresh data in background
    }

    async function fetchPosts() {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      
      if (!cached) {
        if (isAppending) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
      }
      setError(null);
      
      try {
        const params = new URLSearchParams({
          _embed: "true",
          per_page: String(options?.perPage || 20),
          page: String(page),
        });
        
        if (categoryToUse) {
          params.append("categories", String(categoryToUse));
        }

        const response = await fetch(`${API_BASE}/posts?${params}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        const totalPostsHeader = response.headers.get("X-WP-Total");
        const parsedTotalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;
        const parsedTotalPosts = totalPostsHeader ? parseInt(totalPostsHeader, 10) : 0;
        
        setTotalPages(parsedTotalPages);
        setTotalPosts(parsedTotalPosts);
        
        const rawPosts: WPPostRaw[] = await response.json();
        const transformedPosts = rawPosts.map(transformPost);
        
        // Cache the results
        setCache(cacheKey, transformedPosts, {
          totalPages: parsedTotalPages,
          totalPosts: parsedTotalPosts,
        });
        
        if (isAppending) {
          setPosts(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newPosts = transformedPosts.filter(p => !existingIds.has(p.id));
            return [...prev, ...newPosts];
          });
        } else {
          setPosts(transformedPosts);
        }
        
        currentPageRef.current = page;
      } catch (err) {
        console.error("Error fetching WordPress posts:", err);
        // Only show error if we don't have cached data
        if (!cached) {
          setError(err instanceof Error ? err.message : "Failed to fetch posts");
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    }

    fetchPosts();
  }, [resolvedCategoryId, options?.perPage, options?.page, options?.append, options?.categoryName, options?.categorySlug]);

  return { posts, loading: loading || resolvingCategory, loadingMore, error, totalPages, totalPosts, categoryName: resolvedCategoryName, categoryDescription: resolvedCategoryDescription, categoryCount: resolvedCategoryCount, categoryNotFound };
}

export function useWordPressPost(slug: string | undefined) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const cacheKey = getCacheKey("post", { slug });
    const cached = getFromCache<WordPressPost>(cacheKey);

    // Return cached data immediately if fresh
    if (cached && isCacheFresh(cached.timestamp)) {
      setPost(cached.data);
      setLoading(false);
      return;
    }

    // Use stale data while revalidating
    if (cached && !isCacheStale(cached.timestamp)) {
      setPost(cached.data);
      setLoading(false);
    }

    async function fetchPost() {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      
      if (!cached) {
        setLoading(true);
      }
      setError(null);
      
      try {
        const response = await fetch(`${API_BASE}/posts?slug=${slug}&_embed`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        
        const rawPosts: WPPostRaw[] = await response.json();
        
        if (rawPosts.length === 0) {
          setPost(null);
        } else {
          const transformedPost = transformPost(rawPosts[0]);
          setCache(cacheKey, transformedPost);
          setPost(transformedPost);
        }
      } catch (err) {
        console.error("Error fetching WordPress post:", err);
        if (!cached) {
          setError(err instanceof Error ? err.message : "Failed to fetch post");
        }
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}

export function useWordPressCategories() {
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = getCacheKey("categories", {});
    const cached = getFromCache<WordPressCategory[]>(cacheKey);

    if (cached && isCacheFresh(cached.timestamp)) {
      setCategories(cached.data);
      setLoading(false);
      return;
    }

    if (cached && !isCacheStale(cached.timestamp)) {
      setCategories(cached.data);
      setLoading(false);
    }

    async function fetchCategories() {
      try {
        const response = await fetch(`${API_BASE}/categories?per_page=100`);
        if (response.ok) {
          const data = await response.json();
          const transformedCategories: WordPressCategory[] = data.map((cat: { id: number; name: string; slug: string; description?: string; count?: number }) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: cat.description || '',
            count: cat.count || 0,
          }));
          setCache(cacheKey, transformedCategories);
          setCategories(transformedCategories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}

// Hook to fetch all tags from WordPress API
export function useWordPressTags() {
  const [tags, setTags] = useState<(WordPressTag & { count: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = getCacheKey("tags", {});
    const cached = getFromCache<(WordPressTag & { count: number })[]>(cacheKey);

    if (cached && isCacheFresh(cached.timestamp)) {
      setTags(cached.data);
      setLoading(false);
      return;
    }

    if (cached && !isCacheStale(cached.timestamp)) {
      setTags(cached.data);
      setLoading(false);
    }

    async function fetchTags() {
      try {
        const response = await fetch(`${API_BASE}/tags?per_page=100`);
        if (response.ok) {
          const data = await response.json();
          const transformedTags: (WordPressTag & { count: number })[] = data.map((tag: { id: number; name: string; slug: string; count?: number }) => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            count: tag.count || 0,
          }));
          setCache(cacheKey, transformedTags);
          setTags(transformedTags);
        }
      } catch (err) {
        console.error("Error fetching tags:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  return { tags, loading };
}

// Utility to manually clear the WordPress cache
export function clearWordPressCache(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    memoryCache.delete(key);
  });
}

// Track ongoing prefetch requests to avoid duplicates
const prefetchingPosts = new Set<string>();

// Prefetch a single post by slug to warm the cache
export async function prefetchPost(slug: string): Promise<void> {
  if (!slug || prefetchingPosts.has(slug)) return;
  
  const cacheKey = getCacheKey("post", { slug });
  const cached = getFromCache<WordPressPost>(cacheKey);
  
  // Skip if already cached and fresh
  if (cached && isCacheFresh(cached.timestamp)) {
    return;
  }
  
  prefetchingPosts.add(slug);
  
  try {
    const response = await fetch(`${API_BASE}/posts?slug=${slug}&_embed`);
    
    if (response.ok) {
      const rawPosts: WPPostRaw[] = await response.json();
      if (rawPosts.length > 0) {
        const transformedPost = transformPost(rawPosts[0]);
        setCache(cacheKey, transformedPost);
      }
    }
  } catch (err) {
    console.warn("Prefetch failed for:", slug, err);
  } finally {
    prefetchingPosts.delete(slug);
  }
}

// Prefetch with delay (useful for hover - only prefetch if user hovers for a moment)
let prefetchTimeout: ReturnType<typeof setTimeout> | null = null;

export function prefetchPostOnHover(slug: string, delay = 150): void {
  if (prefetchTimeout) {
    clearTimeout(prefetchTimeout);
  }
  
  prefetchTimeout = setTimeout(() => {
    prefetchPost(slug);
  }, delay);
}

export function cancelPrefetch(): void {
  if (prefetchTimeout) {
    clearTimeout(prefetchTimeout);
    prefetchTimeout = null;
  }
}
