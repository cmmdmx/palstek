import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins:      [react()],
    publicDir:    path.resolve(__dirname, "src/static"),
    optimizeDeps: {
        include: ["ava"]
    },
    build: {
        minify:      true,
        sourcemap:   false,
        emptyOutDir: true,
        outDir:      path.resolve(__dirname, "dist"),
        lib:         {
            entry:    path.resolve(__dirname, "src/index.ts"),
            name:     "palstek",
            formats:  ["es", "umd"],
            fileName: format => `index.${format}.js`
        },
        rollupOptions: {
            external: ["react"],
            cache:    false,
            output:   {
                exports: "named",
                globals: {
                    react: "React"
                },
                sourcemap:               false,
                sourcemapExcludeSources: true
            }
        },
        commonjsOptions: {
            sourceMap: false
        }
    }
});
