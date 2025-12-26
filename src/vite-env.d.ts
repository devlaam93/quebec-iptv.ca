/// <reference types="vite/client" />

// vite-imagetools type declarations for image transformations
// These allow importing images with query parameters for optimization

// WebP format
declare module '*?webp' {
  const src: string;
  export default src;
}

declare module '*?format=webp' {
  const src: string;
  export default src;
}

// Optimize preset
declare module '*?optimize' {
  const src: string;
  export default src;
}

// Width-based resizing (common sizes)
declare module '*?w=320' {
  const src: string;
  export default src;
}

declare module '*?w=480' {
  const src: string;
  export default src;
}

declare module '*?w=640' {
  const src: string;
  export default src;
}

declare module '*?w=768' {
  const src: string;
  export default src;
}

declare module '*?w=1024' {
  const src: string;
  export default src;
}

declare module '*?w=1280' {
  const src: string;
  export default src;
}

declare module '*?w=1536' {
  const src: string;
  export default src;
}

declare module '*?w=1920' {
  const src: string;
  export default src;
}

// Width + WebP combinations
declare module '*?w=320&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=480&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=640&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=768&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=1024&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=1280&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=1536&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=1920&format=webp' {
  const src: string;
  export default src;
}

// Support for imagetools metadata
declare module '*?as=metadata' {
  const metadata: {
    src: string;
    width: number;
    height: number;
    format: string;
  };
  export default metadata;
}

// Support for srcset generation
declare module '*?srcset' {
  const srcset: string;
  export default srcset;
}
