import { useState, useEffect } from "react";

const API_BASE = "https://posts.quebec-iptv.ca/wp-json/wp/v2";

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
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
    categoryId: category.id,
    tags: tags.map(t => ({ id: t.id, name: t.name, slug: t.slug })),
    metaTitle: yoast?.title,
    metaDescription: yoast?.description,
  };
}

export function useWordPressPosts(options?: { 
  categoryId?: number; 
  perPage?: number; 
  page?: number;
}) {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams({
          _embed: "true",
          per_page: String(options?.perPage || 100),
          page: String(options?.page || 1),
        });
        
        if (options?.categoryId) {
          params.append("categories", String(options.categoryId));
        }

        const response = await fetch(`${API_BASE}/posts?${params}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        const totalPostsHeader = response.headers.get("X-WP-Total");
        
        setTotalPages(totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1);
        setTotalPosts(totalPostsHeader ? parseInt(totalPostsHeader, 10) : 0);
        
        const rawPosts: WPPostRaw[] = await response.json();
        const transformedPosts = rawPosts.map(transformPost);
        
        setPosts(transformedPosts);
      } catch (err) {
        console.error("Error fetching WordPress posts:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [options?.categoryId, options?.perPage, options?.page]);

  return { posts, loading, error, totalPages, totalPosts };
}

export function useWordPressPost(slug: string | undefined) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchPost() {
      setLoading(true);
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
          setPost(transformPost(rawPosts[0]));
        }
      } catch (err) {
        console.error("Error fetching WordPress post:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch post");
      } finally {
        setLoading(false);
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
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_BASE}/categories?per_page=100`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.map((cat: { id: number; name: string; slug: string }) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
          })));
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
