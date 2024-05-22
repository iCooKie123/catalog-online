import { defineConfig } from "vitest/config";
import path from "path";
export default defineConfig({
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./tests/setup.js"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@/components": path.resolve(__dirname, "./src/components"),
            "@/contexts": path.resolve(__dirname, "./src/contexts"),
            "@/pages": path.resolve(__dirname, "./src/pages"),
            "@/models": path.resolve(__dirname, "./src/models"),
        },
    },
});
