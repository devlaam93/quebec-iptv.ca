import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface WordPressYoast {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  robots: { index: string; follow: string };
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
  categories: WordPressCategory[];
  tags: WordPressTag[];
  yoast: WordPressYoast;
  source: 'wordpress';
}

interface FetchPostsResponse {
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
  error?: string;
}

export const useWordPressPosts = (perPage: number = 100) => {
  return useQuery({
    queryKey: ['wordpress-posts', perPage],
    queryFn: async (): Promise<FetchPostsResponse> => {
      const { data, error } = await supabase.functions.invoke<FetchPostsResponse>(
        'fetch-wordpress-posts',
        {
          body: {},
        }
      );

      if (error) {
        console.error('Error fetching WordPress posts:', error);
        return { posts: [], categories: [], tags: [] };
      }

      return data || { posts: [], categories: [], tags: [] };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useWordPressPost = (slug: string) => {
  return useQuery({
    queryKey: ['wordpress-post', slug],
    queryFn: async (): Promise<WordPressPost | null> => {
      const { data, error } = await supabase.functions.invoke<FetchPostsResponse>(
        'fetch-wordpress-posts',
        {
          body: {},
        }
      );

      if (error) {
        console.error('Error fetching WordPress post:', error);
        return null;
      }

      // Find the post by slug
      const post = data?.posts?.find(p => p.slug === slug);
      return post || null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
