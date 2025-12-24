import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface YoastHeadJson {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: Array<{ url: string; width: number; height: number }>;
  canonical?: string;
  robots?: {
    index?: string;
    follow?: string;
  };
  schema?: object;
}

interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  categories: number[];
  tags: number[];
  yoast_head_json?: YoastHeadJson;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text?: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>;
  };
}

interface TransformedPost {
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
  categories: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id: number; name: string; slug: string }>;
  yoast: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    canonical: string;
    robots: { index: string; follow: string };
  };
  source: 'wordpress';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&#8217;/g, "'").replace(/&#8230;/g, '...').trim();
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');
    const perPage = url.searchParams.get('per_page') || '100';
    const category = url.searchParams.get('category');
    const tag = url.searchParams.get('tag');
    
    const wpApiUrl = 'https://blog.iptvfromcanada.ca/wp-json/wp/v2/posts';
    
    let apiUrl = `${wpApiUrl}?_embed&per_page=${perPage}`;
    
    // If slug is provided, fetch single post
    if (slug) {
      apiUrl = `${wpApiUrl}?slug=${slug}&_embed`;
    }
    
    // Filter by category
    if (category) {
      apiUrl += `&categories=${category}`;
    }
    
    // Filter by tag
    if (tag) {
      apiUrl += `&tags=${tag}`;
    }

    console.log('Fetching from WordPress API:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'IPTV-Quebec/1.0',
      },
    });

    if (!response.ok) {
      console.error('WordPress API error:', response.status, response.statusText);
      throw new Error(`WordPress API responded with status: ${response.status}`);
    }

    const posts: WordPressPost[] = await response.json();
    console.log(`Fetched ${posts.length} posts from WordPress`);

    const transformedPosts: TransformedPost[] = posts.map((post) => {
      // Get featured image
      let image = '';
      let imageAlt = '';
      if (post._embedded?.['wp:featuredmedia']?.[0]) {
        image = post._embedded['wp:featuredmedia'][0].source_url || '';
        imageAlt = post._embedded['wp:featuredmedia'][0].alt_text || '';
      }

      // Get categories
      const categories: Array<{ id: number; name: string; slug: string }> = [];
      let mainCategory = 'Guide';
      let mainCategorySlug = 'guide';
      
      if (post._embedded?.['wp:term']) {
        post._embedded['wp:term'].forEach(termGroup => {
          termGroup.forEach(term => {
            if (term.taxonomy === 'category') {
              categories.push({ id: term.id, name: term.name, slug: term.slug });
              if (categories.length === 1) {
                mainCategory = term.name;
                mainCategorySlug = term.slug;
              }
            }
          });
        });
      }

      // Get tags
      const tags: Array<{ id: number; name: string; slug: string }> = [];
      if (post._embedded?.['wp:term']) {
        post._embedded['wp:term'].forEach(termGroup => {
          termGroup.forEach(term => {
            if (term.taxonomy === 'post_tag') {
              tags.push({ id: term.id, name: term.name, slug: term.slug });
            }
          });
        });
      }

      // Get Yoast SEO data
      const yoast = {
        title: post.yoast_head_json?.title || stripHtml(post.title.rendered),
        description: post.yoast_head_json?.description || stripHtml(post.excerpt.rendered).slice(0, 160),
        ogTitle: post.yoast_head_json?.og_title || stripHtml(post.title.rendered),
        ogDescription: post.yoast_head_json?.og_description || stripHtml(post.excerpt.rendered).slice(0, 160),
        ogImage: post.yoast_head_json?.og_image?.[0]?.url || image,
        canonical: post.yoast_head_json?.canonical || `https://blog.iptvfromcanada.ca/${post.slug}`,
        robots: {
          index: post.yoast_head_json?.robots?.index || 'index',
          follow: post.yoast_head_json?.robots?.follow || 'follow',
        },
      };

      return {
        id: post.id,
        title: stripHtml(post.title.rendered),
        excerpt: stripHtml(post.excerpt.rendered),
        content: post.content.rendered,
        slug: post.slug,
        date: formatDate(post.date),
        readTime: calculateReadTime(post.content.rendered),
        image,
        imageAlt,
        category: mainCategory,
        categorySlug: mainCategorySlug,
        categories,
        tags,
        yoast,
        source: 'wordpress' as const,
      };
    });

    // Also fetch categories and tags lists
    let allCategories: Array<{ id: number; name: string; slug: string; count: number }> = [];
    let allTags: Array<{ id: number; name: string; slug: string; count: number }> = [];

    try {
      const [catResponse, tagResponse] = await Promise.all([
        fetch('https://blog.iptvfromcanada.ca/wp-json/wp/v2/categories?per_page=50', {
          headers: { 'Accept': 'application/json', 'User-Agent': 'IPTV-Quebec/1.0' },
        }),
        fetch('https://blog.iptvfromcanada.ca/wp-json/wp/v2/tags?per_page=50', {
          headers: { 'Accept': 'application/json', 'User-Agent': 'IPTV-Quebec/1.0' },
        }),
      ]);

      if (catResponse.ok) {
        const cats = await catResponse.json();
        allCategories = cats.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug, count: c.count }));
      }

      if (tagResponse.ok) {
        const tagsList = await tagResponse.json();
        allTags = tagsList.map((t: any) => ({ id: t.id, name: t.name, slug: t.slug, count: t.count }));
      }
    } catch (e) {
      console.error('Error fetching categories/tags:', e);
    }

    return new Response(JSON.stringify({ 
      posts: transformedPosts,
      categories: allCategories,
      tags: allTags,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return new Response(JSON.stringify({ error: error.message, posts: [], categories: [], tags: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
