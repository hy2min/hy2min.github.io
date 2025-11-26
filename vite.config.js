import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Plugin to create 404.html from index.html after build
const create404Plugin = () => {
  return {
    name: "create-404",
    closeBundle() {
      // Read the built index.html
      const distPath = join(process.cwd(), "dist");
      const indexPath = join(distPath, "index.html");
      const html404Path = join(distPath, "404.html");
      
      try {
        let html = readFileSync(indexPath, "utf-8");
        
        // Add redirect script before the closing head tag
        const redirectScript = `
    <script>
      // GitHub Pages SPA redirect - redirects to index.html with path in query
      (function() {
        var pathSegmentsToKeep = 0;
        var l = window.location;
        var redirect = l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
          l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash;
        l.replace(redirect);
      })();
    </script>`;
        
        // Insert redirect script before closing </head>
        html = html.replace("</head>", redirectScript + "\n  </head>");
        
        // Write 404.html
        writeFileSync(html404Path, html, "utf-8");
        console.log("✓ Created 404.html for GitHub Pages");
      } catch (error) {
        console.warn("Warning: Could not create 404.html:", error.message);
      }
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), create404Plugin()],
  base: "/",
});
