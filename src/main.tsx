import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initCacheWarming } from "@/lib/cache-warming";

const container = document.getElementById("root")!;
const root = createRoot(container);

// Initialize image cache warming for critical above-the-fold images
initCacheWarming({ enableLogging: import.meta.env.DEV });

// Run axe-core accessibility checker in development mode only
if (import.meta.env.DEV) {
  import("@axe-core/react").then((axe) => {
    axe.default(React, container, 1000).then(() => {
      console.log(
        "%c🔍 Accessibility checker active - issues will appear below",
        "color: #4CAF50; font-weight: bold; font-size: 12px;"
      );
    });
  });
}

root.render(<App />);
