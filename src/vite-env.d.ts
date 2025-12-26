/// <reference types="vite/client" />

// vite-imagetools type declarations
declare module '*?webp' {
  const src: string;
  export default src;
}

declare module '*?optimize' {
  const src: string;
  export default src;
}

declare module '*?w=*' {
  const src: string;
  export default src;
}

declare module '*?format=webp' {
  const src: string;
  export default src;
}

declare module '*&format=webp' {
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
