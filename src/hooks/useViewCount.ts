import { useState, useEffect, useCallback } from 'react';

const VIEW_COUNTS_KEY = 'blog_view_counts';

interface ViewCounts {
  [slug: string]: number;
}

const getViewCounts = (): ViewCounts => {
  try {
    const stored = localStorage.getItem(VIEW_COUNTS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveViewCounts = (counts: ViewCounts): void => {
  try {
    localStorage.setItem(VIEW_COUNTS_KEY, JSON.stringify(counts));
  } catch {
    // Ignore storage errors
  }
};

export const useViewCount = (slug?: string) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (slug) {
      const counts = getViewCounts();
      setViewCount(counts[slug] || 0);
    }
  }, [slug]);

  const incrementViewCount = useCallback((postSlug: string) => {
    const counts = getViewCounts();
    const sessionKey = `viewed_${postSlug}`;
    
    // Only count once per session
    if (!sessionStorage.getItem(sessionKey)) {
      counts[postSlug] = (counts[postSlug] || 0) + 1;
      saveViewCounts(counts);
      sessionStorage.setItem(sessionKey, 'true');
      
      if (postSlug === slug) {
        setViewCount(counts[postSlug]);
      }
    }
  }, [slug]);

  return { viewCount, incrementViewCount };
};

export const useAllViewCounts = () => {
  const [viewCounts, setViewCounts] = useState<ViewCounts>({});

  useEffect(() => {
    setViewCounts(getViewCounts());
  }, []);

  const getViewCount = useCallback((slug: string): number => {
    return viewCounts[slug] || 0;
  }, [viewCounts]);

  return { viewCounts, getViewCount };
};
