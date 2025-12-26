import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Run axe-core accessibility checker in development mode only
if (import.meta.env.DEV) {
  import("@axe-core/react").then((axe) => {
    axe.default(React, ReactDOM, 1000).then(() => {
      console.log(
        "%c🔍 Accessibility checker active - issues will appear below",
        "color: #4CAF50; font-weight: bold; font-size: 12px;"
      );
    });
  });
}

root.render(<App />);
