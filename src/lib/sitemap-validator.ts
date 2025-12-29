/**
 * Sitemap-based link validation utility
 * Parses sitemap.xml and validates internal links against it
 */

const SITE_BASE = "https://quebec-iptv.ca";

// Valid routes extracted from sitemap.xml
const SITEMAP_ROUTES: string[] = [
  // Homepage
  "/",
  // Conversion pages
  "/tarifs",
  "/essai-gratuit",
  // Content pages
  "/liste-chaines",
  "/blog",
  "/tutorial",
  "/faq",
  // Secondary pages
  "/contact",
  "/revendeur",
  // Blog articles
  "/blog/meilleur-service-iptv-quebec",
  "/blog/comment-iptv-fonctionne",
  "/blog/iptv-legal-quebec",
  "/blog/meilleure-application-iptv",
  "/blog/installer-iptv-montreal-quebec",
  "/blog/fire-stick-iptv-fonctionnement",
  "/blog/applications-gratuites-fire-tv-stick",
  "/blog/acheter-code-iptv",
  "/blog/ibo-player-guide",
  // LLM page
  "/llm.html",
  // Accessibility
  "/accessibilite",
  // Legal pages
  "/politique-remboursement",
  "/politique-confidentialite",
  "/conditions-generales",
  "/conditions-paiement",
  "/annulation-commande",
  "/dmca-policy",
  "/avis-non-responsabilite",
];

// Dynamic route patterns (WordPress posts, categories, tags)
const DYNAMIC_ROUTE_PATTERNS: RegExp[] = [
  /^\/blog\/[a-z0-9-]+$/, // WordPress blog posts
  /^\/tutorial\/[a-z0-9-]+$/, // WordPress tutorials
  /^\/category\/[a-z0-9-]+$/, // Categories
  /^\/tag\/[a-z0-9-]+$/, // Tags
  /^\/tags$/, // Tags list
];

// External link patterns to skip
const EXTERNAL_PATTERNS: RegExp[] = [
  /^https?:\/\//, // Full URLs
  /^mailto:/, // Email links
  /^tel:/, // Phone links
  /^#/, // Anchor links
  /^javascript:/, // JavaScript links
];

export interface LinkValidationResult {
  href: string;
  element: string;
  text: string;
  isValid: boolean;
  reason?: string;
  location?: string;
}

export interface ValidationReport {
  totalLinks: number;
  validLinks: number;
  brokenLinks: LinkValidationResult[];
  skippedLinks: LinkValidationResult[];
  dynamicLinks: LinkValidationResult[];
  timestamp: Date;
}

/**
 * Check if a path is in the static sitemap routes
 */
export function isInSitemap(path: string): boolean {
  const normalizedPath = normalizePath(path);
  return SITEMAP_ROUTES.includes(normalizedPath);
}

/**
 * Check if a path matches a dynamic route pattern
 */
export function isDynamicRoute(path: string): boolean {
  const normalizedPath = normalizePath(path);
  return DYNAMIC_ROUTE_PATTERNS.some((pattern) => pattern.test(normalizedPath));
}

/**
 * Check if a link is external
 */
export function isExternalLink(href: string): boolean {
  return EXTERNAL_PATTERNS.some((pattern) => pattern.test(href));
}

/**
 * Normalize a path for comparison
 */
export function normalizePath(path: string): string {
  // Remove query strings and hash
  let normalized = path.split("?")[0].split("#")[0];

  // Remove site base if present
  if (normalized.startsWith(SITE_BASE)) {
    normalized = normalized.replace(SITE_BASE, "");
  }

  // Ensure leading slash
  if (!normalized.startsWith("/")) {
    normalized = "/" + normalized;
  }

  // Remove trailing slash (except for root)
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

/**
 * Validate a single link
 */
export function validateLink(href: string): {
  isValid: boolean;
  isDynamic: boolean;
  reason?: string;
} {
  if (!href || isExternalLink(href)) {
    return { isValid: true, isDynamic: false, reason: "external" };
  }

  const normalizedPath = normalizePath(href);

  // Check static routes first
  if (isInSitemap(normalizedPath)) {
    return { isValid: true, isDynamic: false };
  }

  // Check dynamic routes
  if (isDynamicRoute(normalizedPath)) {
    return { isValid: true, isDynamic: true, reason: "dynamic-route" };
  }

  return {
    isValid: false,
    isDynamic: false,
    reason: `Not found in sitemap: ${normalizedPath}`,
  };
}

/**
 * Scan the DOM for all internal links and validate them
 */
export function scanPageLinks(): ValidationReport {
  const links = document.querySelectorAll("a[href]");
  const results: LinkValidationResult[] = [];
  const brokenLinks: LinkValidationResult[] = [];
  const skippedLinks: LinkValidationResult[] = [];
  const dynamicLinks: LinkValidationResult[] = [];

  links.forEach((link) => {
    const anchor = link as HTMLAnchorElement;
    const href = anchor.getAttribute("href") || "";
    const text = anchor.textContent?.trim() || "";
    const tagName = anchor.tagName;

    // Get location info
    const parent = anchor.parentElement;
    const location = parent
      ? `${parent.tagName.toLowerCase()}${parent.className ? "." + parent.className.split(" ")[0] : ""}`
      : "unknown";

    const result: LinkValidationResult = {
      href,
      element: tagName,
      text: text.slice(0, 50) + (text.length > 50 ? "..." : ""),
      isValid: true,
      location,
    };

    // Skip external links
    if (isExternalLink(href)) {
      result.reason = "external";
      skippedLinks.push(result);
      results.push(result);
      return;
    }

    const validation = validateLink(href);

    if (validation.isDynamic) {
      result.isValid = true;
      result.reason = "dynamic-route";
      dynamicLinks.push(result);
    } else if (!validation.isValid) {
      result.isValid = false;
      result.reason = validation.reason;
      brokenLinks.push(result);
    }

    results.push(result);
  });

  return {
    totalLinks: results.length,
    validLinks: results.filter((r) => r.isValid).length,
    brokenLinks,
    skippedLinks,
    dynamicLinks,
    timestamp: new Date(),
  };
}

/**
 * Get all sitemap routes for reference
 */
export function getSitemapRoutes(): string[] {
  return [...SITEMAP_ROUTES];
}

/**
 * Add a route to the validation list (for runtime-discovered routes)
 */
export function addDynamicRoutePattern(pattern: RegExp): void {
  if (!DYNAMIC_ROUTE_PATTERNS.some((p) => p.source === pattern.source)) {
    DYNAMIC_ROUTE_PATTERNS.push(pattern);
  }
}

/**
 * Log validation report to console
 */
export function logValidationReport(report: ValidationReport): void {
  console.group("🔗 Link Validation Report");
  console.log(`📊 Total links scanned: ${report.totalLinks}`);
  console.log(`✅ Valid links: ${report.validLinks}`);
  console.log(`⚠️ Dynamic links: ${report.dynamicLinks.length}`);
  console.log(`❌ Broken links: ${report.brokenLinks.length}`);
  console.log(`⏭️ Skipped (external): ${report.skippedLinks.length}`);

  if (report.brokenLinks.length > 0) {
    console.group("❌ Broken Links");
    report.brokenLinks.forEach((link) => {
      console.warn(`${link.href} - ${link.reason}`, {
        text: link.text,
        location: link.location,
      });
    });
    console.groupEnd();
  }

  if (report.dynamicLinks.length > 0) {
    console.group("⚠️ Dynamic Links (need runtime validation)");
    report.dynamicLinks.forEach((link) => {
      console.info(`${link.href}`, { text: link.text, location: link.location });
    });
    console.groupEnd();
  }

  console.groupEnd();
}
