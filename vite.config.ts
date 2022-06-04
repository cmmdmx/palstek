import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

module.exports = defineConfig({
    plugins:   [react()],
    publicDir: path.resolve(__dirname, "src/static"),
    build:     {
        minify:      true,
        sourcemap:   true,
        emptyOutDir: true,
        outDir:      path.resolve(__dirname, "dist"),
        lib:         {
            entry:    path.resolve(__dirname, "src/index.ts"),
            name:     "palstek",
            fileName: format => `palstek.${format}.js`
        },
        rollupOptions: {
            external: ["react"],
            cache:    false,
            output:   {
                exports: "named",
                globals: {
                    react: "React"
                },
                sourcemap:               true,
                sourcemapExcludeSources: true,
                compact:                 true
            }
        },
        commonjsOptions: {
            transformMixedEsModules: true,
            sourceMap:               false
        }
    }
});
